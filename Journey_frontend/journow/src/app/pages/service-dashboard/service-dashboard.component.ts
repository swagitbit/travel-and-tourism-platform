import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { addService } from '../../interfaces/add-service';

@Component({
  selector: 'app-service-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.css',
})
export class ServiceDashboardComponent implements OnInit {
  addServiceForm!: FormGroup;

  fb = inject(FormBuilder);
  listingService = inject(ListingService);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.addServiceForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      amenities: ['', Validators.required],
      priceRange: [0, [Validators.required, Validators.min(0)]],
      contactDetails: ['', [Validators.required]],
      image: ['', Validators.required],
    });
  }

  submitService() {
    if (this.addServiceForm.valid) {
      const newService: addService = this.addServiceForm.value;

      this.listingService.addService(newService).subscribe({
        next: (response) => {
          // Show success message
          this.snackBar.open('Service added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });

          // Reset the form
          this.addServiceForm.reset();
        },
        error: (error) => {
          console.error('Error adding service:', error);

          // Show error message
          const errorMessage =
            error?.error?.message || 'Failed to add service. Try again!';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        },
      });
    } else {
      this.snackBar.open('Please fill out all required fields!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
      });
    }
  }
}
