import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityCard } from '../interfaces/city-card';
import { CityListing } from '../interfaces/city-listing';
import { Reviews } from '../interfaces/reviews';
import { AddReview } from '../interfaces/add-review';
import { addService } from '../interfaces/add-service';
import { UpdateService } from '../interfaces/update-service';
import { ServiceLisiting } from '../interfaces/service-listing';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCities = (): Observable<CityCard[]> =>
    this.http.get<CityCard[]>(`${this.apiUrl}/cities`);

  getListings = (): Observable<CityListing[]> =>
    this.http.get<CityListing[]>(`${this.apiUrl}/listings`);

  getListingbyId = (listingId: number): Observable<CityListing> => {
    const url = `${this.apiUrl}/listings/${listingId}`;
    return this.http.get<CityListing>(url);
  };

  getListingbyContact = (contact: string): Observable<ServiceLisiting> => {
    const url = `${this.apiUrl}/listings/contact?contactDetails=${contact}`;
    return this.http.get<CityListing>(url);
  };

  searchListings(
    location: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    category?: string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('location', location)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (minPrice !== undefined)
      params = params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined)
      params = params.set('maxPrice', maxPrice.toString());
    if (minRating !== undefined)
      params = params.set('minRating', minRating.toString());
    if (category !== undefined) params = params.set('category', category);

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getReviewbyId = (listingId: number): Observable<Reviews> => {
    const url = `${this.apiUrl}/ReviewRatings/ByListing/${listingId}`;
    return this.http.get<Reviews>(url);
  };

  deleteReview = (id: number): Observable<void> =>
    this.http.delete<void>(`${this.apiUrl}/RatingReview/${id}`);

  addService(service: addService): Observable<CityListing> {
    const url = `${this.apiUrl}/listings`;
    return this.http.post<CityListing>(url, service);
  }

  updateService(service: UpdateService, listingId: number): Observable<any> {
    const url = `${this.apiUrl}/listings/${listingId}`;
    return this.http.put(url, service);
  }

  delete = (id: number): Observable<any> =>
    this.http.delete(`${this.apiUrl}/listings/${id}`);

  addReview(review: AddReview): Observable<any> {
    const url = `${this.apiUrl}/ReviewRatings`;
    return this.http.post(url, review);
  }
}
