import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Jaula } from '../models/jaula.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JaulaService {
  // Mantiene el estado actual de la lista
  private jaulasSubject = new BehaviorSubject<Jaula[]>([]);
  jaulas$ = this.jaulasSubject.asObservable();

  private apiUrl = 'http://localhost:3000/jaulas'; // URL de json-server

  constructor(private http: HttpClient) { }

  // Obtener todos las jaulas
  getJaulas(): Observable<Jaula[]> {
    return this.http.get<Jaula[]>(this.apiUrl);
  }
  // Crear una nueva jaula
  createJaula(jaula: Jaula): Observable<Jaula> {
    return this.http.post<Jaula>(this.apiUrl, jaula).pipe(
      tap(() => {
        this.getJaulas().subscribe(jaula => this.jaulasSubject.next(jaula));
      })
    );
  }
  // Actualizar un producto existente
  updateJaula(jaula: Jaula): Observable<Jaula> {
    const url = `${this.apiUrl}/${jaula.id}`;
    return this.http.put<Jaula>(url, jaula).pipe(
      tap(() => {
        this.getJaulas().subscribe(jaula => this.jaulasSubject.next(jaula));
      })
    );;
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.getJaulas().subscribe(jaula => this.jaulasSubject.next(jaula));
      })
    );
  }
}
