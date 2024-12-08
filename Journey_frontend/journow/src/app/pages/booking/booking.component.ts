import { Component, inject } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { CityListing } from '../../interfaces/city-listing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { Bookings } from '../../interfaces/booking-request';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  listingService = inject(ListingService);
  bookingService = inject(BookingService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  selectedListing: CityListing | undefined;
  numberOfPeople: number = 1;
  totalAmount: number = 0;
  userId: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const listid = params.get('listingid');
      if (listid) {
        const numericId = Number(listid);
        this.fetchListingById(numericId);
      }
    });

    this.authService.getDetail().subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  fetchListingById(id: number): void {
    this.listingService.getListingbyId(id).subscribe({
      next: (data) => {
        this.selectedListing = data;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Failed to fetch listing', err);
      },
    });
  }

  calculateTotal(): void {
    if (this.selectedListing) {
      this.totalAmount = this.selectedListing.priceRange * this.numberOfPeople;
    }
  }

  increasePeople(): void {
    this.numberOfPeople++;
    this.calculateTotal();
  }

  decreasePeople(): void {
    if (this.numberOfPeople > 1) {
      this.numberOfPeople--;
      this.calculateTotal();
    }
  }

  confirmBooking(): void {
    if (this.selectedListing && this.userId) {
      const booking: Bookings = {
        id: this.userId,
        listingId: this.selectedListing.listingId,
        numberOfPeople: this.numberOfPeople,
      };
      console.log('Booking Payload:', booking);
      this.bookingService.addBooking(booking).subscribe({
        next: (response) => {
          alert('Booking confirmed!');
        },
        error: (err) => {
          console.error('Failed to confirm booking', err);
          alert('Failed to confirm booking. Please try again.');
        },
      });
    } else {
      alert('Missing booking details or user information.');
    }
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }
}
