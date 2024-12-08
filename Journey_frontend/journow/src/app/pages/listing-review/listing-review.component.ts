import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ListingService } from '../../services/listing.service';
import { CityListing } from '../../interfaces/city-listing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reviews } from '../../interfaces/reviews';
import { AuthService } from '../../services/auth.service';
import { AddReview } from '../../interfaces/add-review'; // Interface for adding a review
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule for the dropdown
import { MatFormFieldModule } from '@angular/material/form-field'; // Import for form field
import { MatInputModule } from '@angular/material/input'; // Import for matInput in the textarea
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-review',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './listing-review.component.html',
  styleUrls: ['./listing-review.component.css'],
})
export class ListingReviewComponent implements OnInit {
  listingService = inject(ListingService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  selectedListing: CityListing | undefined;
  selectedReview: Reviews[] = [];
  currentUser: any; // Store the current logged-in user's details

  rating: number = 0;
  comment: string = '';
  hoveredRating: number = 0;

  ngOnInit(): void {
    // Get current user details
    this.authService.getDetail().subscribe({
      next: (user) => (this.currentUser = user),
      error: (err) => console.error('Failed to fetch user details', err),
    });

    // Fetch listing details and reviews
    this.route.paramMap.subscribe((params) => {
      const id = params.get('listingid');
      if (id) {
        const numericId = Number(id);
        this.fetchbyId(numericId);
      }
    });
  }

  fetchbyId(id: number): void {
    this.listingService.getListingbyId(id).subscribe({
      next: (data) => (this.selectedListing = data),
      error: (err) => console.error('Failed to fetch listing', err),
    });

    this.listingService.getReviewbyId(id).subscribe({
      next: (data) => {
        this.selectedReview = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('Failed to fetch reviews', err),
    });
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating); // Number of filled stars
    const emptyStars = 5 - fullStars; // Remaining empty stars

    return [
      ...Array(fullStars).fill('★'), // Add filled stars
      ...Array(emptyStars).fill('☆'), // Add empty stars
    ];
  }

  hoverStar(star: number): void {
    this.hoveredRating = star; // Set hovered rating when user hovers over a star
  }

  setRating(star: number): void {
    this.rating = star; // Set the user's rating on click
  }

  // Adds a new review to the list of reviews
  addReview(): void {
    const newReview: AddReview = {
      listingId: this.selectedListing?.listingId || 0,
      userId: this.authService.getUserDetail()?.id, // Assumes a method to get the user ID
      rating: this.rating,
      comment: this.comment,
    };

    // Call the service to add the review
    this.listingService.addReview(newReview).subscribe({
      next: (review) => {
        // Add the review to the top of the list
        this.selectedReview.unshift(review); // Add the new review at the start
        this.resetReviewForm();
      },
      error: (err) => {
        console.error('Failed to add review', err);
      },
    });
  }

  // Resets the review form after submission
  resetReviewForm(): void {
    this.rating = 0;
    this.comment = '';
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

  /*deleteService(serviceId: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.listingService.delete(serviceId).subscribe({
        next: () => {
          this.listings = this.listings.filter(
            (service) => service.listingId !== serviceId
          );
          this.snackBar.open('Service deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        },
        error: (err) => {
          console.error('Error deleting service:', err);
          this.snackBar.open('Failed to delete service. Try again!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        },
      });
    }
  }*/
}
