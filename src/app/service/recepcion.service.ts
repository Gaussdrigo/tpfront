import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Recepcion } from '../models/recepcion.model';
import { Reserva } from '../models/reserva.model';  // Asegúrate de tener este modelo

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  private apiURLRecepciones = 'http://localhost:3000/recepciones';
  private apiURLReservas = 'http://localhost:3000/reservas';

  constructor(private http: HttpClient) { }

  // Obtener todas las recepciones
  getRecepciones(): Observable<Recepcion[]> {
    return this.http.get<Recepcion[]>(this.apiURLRecepciones).pipe(
      tap(recepciones => console.log('Recepciones cargadas:', recepciones)) // Verifica si las fechas están presentes aquí
    );
  }

  // Obtener todas las reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiURLReservas).pipe(
      tap(reservas => console.log('Reservas cargadas:', reservas)) // Verifica que las reservas se están cargando correctamente
    );
  }

  // Obtener una reserva por ID
  getReservaById(id: number): Observable<Reserva> {
    const url = `${this.apiURLReservas}/${id}`;
    return this.http.get<Reserva>(url).pipe(
      tap(reserva => console.log('Reserva obtenida:', reserva))
    );
  }

  // Convertir todas las reservas en recepciones
  convertirReservasARecepciones(): void {
    this.http.get<Reserva[]>(this.apiURLReservas).subscribe(reservas => {
      const recepciones = reservas.map(reserva => {
        console.log('Reserva con fecha:', reserva.cabecera.fecha); // Verificar que la fecha existe

        return {
          id: reserva.id,
          fecha: reserva.cabecera.fecha,
          horaInicioAgendamiento: reserva.cabecera.horaInicioAgendamiento,
          horaFinAgendamiento: reserva.cabecera.horaFinAgendamiento,
          idProveedor: reserva.cabecera.idProveedor,
          idJaula: reserva.cabecera.idJaula,
          estado: 'pendiente',
          horaInicioRecepcion: '',
          horaFinRecepcion: ''
        };
      });

      recepciones.forEach(recepcion => {
        console.log('Recepción generada:', recepcion);
        this.http.post<Recepcion>(this.apiURLRecepciones, recepcion).subscribe();
      });
    });
  }

  // Actualizar una reserva existente
  updateReserva(reserva: Reserva): Observable<Reserva> {
    const url = `${this.apiURLReservas}/${reserva.id}`;

    // Agregar console.log para depuración
    console.log('Actualizando reserva:', reserva);

    return this.http.put<Reserva>(url, reserva).pipe(
      tap(() => {
        console.log('Reserva actualizada exitosamente');
      })
    );
  }

  // Actualizar una recepción existente
  updateRecepcion(recepcion: Recepcion): Observable<Recepcion> {
    const url = `${this.apiURLRecepciones}/${recepcion.id}`;

    // Agregar console.log para depuración
    console.log('Actualizando recepción:', recepcion);

    return this.http.put<Recepcion>(url, recepcion);
  }

}
