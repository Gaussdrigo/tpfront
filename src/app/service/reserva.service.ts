import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // Maintains the current state of the reservation list
  private reservasSubject = new BehaviorSubject<Reserva[]>([]);
  reservas$ = this.reservasSubject.asObservable();

  private apiUrl = 'http://localhost:3000/reservas'; // API URL

  constructor(private http: HttpClient) { }

  // Get all reservations
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      tap(reservas => this.reservasSubject.next(reservas))
    );
  }

  // Get a reservation by ID
  getReserva(idTurno: number): Observable<Reserva> {
    const url = `${this.apiUrl}/${idTurno}`;
    return this.http.get<Reserva>(url);
  }

  // Create a new reservation
  createReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva).pipe(
      tap(() => {
        this.refreshReservas(); // Updates the list of reservations
      })
    );
  }

  // Update an existing reservation
  updateReserva(idTurno: number, reserva: Reserva): Observable<Reserva> {
    const url = `${this.apiUrl}/${idTurno}`;
    return this.http.put<Reserva>(url, reserva).pipe(
      tap(() => {
        this.refreshReservas(); // Updates the list of reservations
      })
    );
  }

  // Delete a reservation
  deleteReserva(idTurno: number): Observable<void> {
    const url = `${this.apiUrl}/${idTurno}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.refreshReservas(); // Updates the list of reservations
      })
    );
  }

  // Helper function to refresh the reservation list
  private refreshReservas(): void {
    this.getReservas().subscribe();
  }
}
