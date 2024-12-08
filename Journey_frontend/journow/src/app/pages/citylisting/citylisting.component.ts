import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { CityListing } from '../../interfaces/city-listing';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-citylisting',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './citylisting.component.html',
  styleUrl: './citylisting.component.css',
})
export class CitylistingComponent implements OnInit {
  listingService = inject(ListingService);
  route = inject(ActivatedRoute);
  cityListings: CityListing[] = [];
  filteredListings: Record<string, CityListing[]> = {
    Hotels: [],
    Restaurant: [],
    Events: [],
  };

  selectedCity: string = ''; // Will be set based on route parameter

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCity = params.get('location') || 'Hyderabad'; // Default to Hyderabad if no location is found
      this.fetchListings();
    });
  }

  fetchListings(): void {
    this.listingService.getListings().subscribe({
      next: (data) => {
        this.cityListings = data.filter(
          (listing) => listing.location === this.selectedCity
        );
        this.filterByCategory();
      },
      error: (err) => {
        console.error('Failed to fetch cities', err);
      },
    });
  }

  filterByCategory(): void {
    this.filteredListings = {
      Hotels: this.cityListings.filter(
        (listing) => listing.category === 'Hotel'
      ),
      Restaurant: this.cityListings.filter(
        (listing) => listing.category === 'Restaurant'
      ),
      Events: this.cityListings.filter(
        (listing) => listing.category === 'Event'
      ),
    };
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }
}
