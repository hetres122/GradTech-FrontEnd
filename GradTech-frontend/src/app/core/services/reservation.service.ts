import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ReservationElement } from '@models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private readonly API_URL: URL = new URL(environment.apiUrl);

  public getReservations(): Observable<ReservationElement[]> {
    const url = `${this.API_URL}api/Reservation`;

    return this.http.get<ReservationElement[]>(url, {
      withCredentials: true,
    });
  }

  public addReservation(reservation: ReservationElement): Observable<ReservationElement> {
    const url = `${this.API_URL}api/Reservation`;

    return this.http.post<ReservationElement>(url, reservation, {
      withCredentials: true,
    });
  }

  public deleteReservation(reservationId: number): Observable<void> {
    const url = `${this.API_URL}api/Reservation/${reservationId}`;

    return this.http.delete<void>(url, {
      withCredentials: true,
    });
  }
}
