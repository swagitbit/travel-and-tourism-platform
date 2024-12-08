import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookings } from '../interfaces/booking-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addBooking(booking: Bookings): Observable<any> {
    const url = `${this.apiUrl}/bookings/book`;
    return this.http.post(url, booking);
  }
}
