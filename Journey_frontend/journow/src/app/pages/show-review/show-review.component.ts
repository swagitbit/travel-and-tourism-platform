import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CityListing } from '../../interfaces/city-listing';
import { Reviews } from '../../interfaces/reviews';

@Component({
  selector: 'app-show-review',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatInputModule],
  templateUrl: './show-review.component.html',
  styleUrl: './show-review.component.css',
})
export class ShowReviewComponent {
  listingService = inject(ListingService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  selectedListing: CityListing | undefined;
  selectedReview: Reviews[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('listingId');
      if (id) {
        console.log('Listing ID from route:', id);
        const numericId = Number(id);
        this.fetchbyId(numericId);
      } else {
        console.log('No listingId found in route');
      }
    });
  }

  fetchbyId(id: number): void {
    this.listingService.getListingbyId(id).subscribe({
      next: (data) => {
        this.selectedListing = data;
        console.log('Fetched listing:', this.selectedListing);
      },
      error: (err) => {
        console.error('Failed to fetch listing', err);
      },
    });

    this.listingService.getReviewbyId(id).subscribe({
      next: (data) => {
        this.selectedReview = Array.isArray(data) ? data : [data];
        console.log('Fetched reviews:', this.selectedReview);
      },
      error: (err) => {
        console.error('Failed to fetch reviews', err);
      },
    });
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }

  deleteReview(reviewId: number): void {
    console.log('Delete button clicked for reviewId:', reviewId);

    // Confirm deletion
    const confirmDelete = confirm(
      'Are you sure you want to delete this review?'
    );
    if (!confirmDelete) return;

    // Call backend service
    this.listingService.deleteReview(reviewId).subscribe({
      next: () => {
        console.log('Review deleted on server.');

        // Remove review from the local array
        this.selectedReview = this.selectedReview.filter(
          (review) => review.reviewId !== reviewId
        );

        console.log('Updated review list:', this.selectedReview);
      },
      error: (err) => {
        console.error('Error deleting review:', err);
      },
    });
  }
}
