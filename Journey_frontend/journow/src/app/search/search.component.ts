import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  listings: any[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fetchListings(params);
    });
  }

  fetchListings(params: any): void {
    const { location, minPrice, maxPrice, minRating, category } = params;

    this.searchListings(
      location,
      minPrice,
      maxPrice,
      minRating,
      category
    ).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.listings = response.listings || [];
        this.currentPage = response.page || 1;
        this.totalPages = Math.ceil(
          response.totalResults / (params.pageSize || 10)
        );
      },
      (error) => {
        console.error('Error fetching listings:', error);
        this.listings = [];
      }
    );
  }

  // Define the missing searchListings method
  searchListings(
    location: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    category?: string
  ): Observable<any> {
    const params: any = { location };

    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    if (minRating !== undefined) params.minRating = minRating;
    if (category !== undefined) params.category = category;

    return this.http.get<any>(`http://localhost:55161/api/listings/search`, {
      params,
    });
  }

  onPrevPage(): void {
    if (this.currentPage > 1) {
      const params = { page: this.currentPage - 1 };
      this.fetchListings(params);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      const params = { page: this.currentPage + 1 };
      this.fetchListings(params);
    }
  }
}
