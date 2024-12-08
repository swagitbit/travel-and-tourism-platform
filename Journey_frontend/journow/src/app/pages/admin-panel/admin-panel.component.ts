import { Component, inject, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CityListing } from '../../interfaces/city-listing';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminComponent implements OnInit {
  listingService = inject(ListingService);
  route = inject(ActivatedRoute);
  cityListings: CityListing[] = [];
  filteredListings: Record<string, CityListing[]> = {
    Hotels: [],
    Restaurant: [],
    Events: [],
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.fetchListings();
    });
  }

  fetchListings(): void {
    this.listingService.getListings().subscribe({
      next: (data) => {
        this.cityListings = data;
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
  // Method to navigate to the listing details page
  /*viewListingDetails(category: string, listingId: number): void {
    this.router.navigate([`/admin/listing-details/${category}`, listingId]);
  }*/
}
/* viewReviews(listingId: number): void {
    // Navigate to the reviews page for the selected listing
    this.router.navigate([`\`]);
  }*/
