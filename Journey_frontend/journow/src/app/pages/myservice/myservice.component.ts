import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { UserDetail } from '../../interfaces/user-detail';
import { ServiceLisiting } from '../../interfaces/service-listing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myservice',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './myservice.component.html',
  styleUrls: ['./myservice.component.css'],
})
export class MyserviceComponent implements OnInit {
  listings: ServiceLisiting[] = [];
  listingService = inject(ListingService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  contactDetails: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.authService.getDetail().subscribe({
      next: (userDetails: UserDetail) => {
        this.contactDetails = userDetails.phoneNumber;
        this.listingService.getListingbyContact(this.contactDetails).subscribe({
          next: (data) => {
            this.listings = Array.isArray(data) ? data : [data];
          },
          error: (err) => {
            console.error('Error fetching services:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }

  deleteService(serviceId: number) {
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
  }

  editService(serviceId: number) {
    this.router.navigate(['/edit-service', serviceId]);
  }
}
