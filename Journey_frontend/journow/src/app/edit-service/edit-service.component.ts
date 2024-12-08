import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListingService } from '../services/listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css',
})
export class EditServiceComponent implements OnInit {
  editForm: FormGroup;
  listingId: number = 0;
  listingService = inject(ListingService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      amenities: [''],
      priceRange: [0, Validators.required],
      contactDetails: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listingId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the service details to populate the form
    this.listingService.getListingbyId(this.listingId).subscribe({
      next: (data) => {
        this.editForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error fetching service details:', err);
        this.snackBar.open('Failed to load service details', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  updateService(): void {
    if (this.editForm.valid) {
      const updatedService = this.editForm.value;
      this.listingService
        .updateService(updatedService, this.listingId)
        .subscribe({
          next: () => {
            this.snackBar.open('Service updated successfully!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/myservices']);
          },
          error: (err) => {
            console.error('Error updating service:', err);
            this.snackBar.open(
              'Failed to update service. Try again!',
              'Close',
              {
                duration: 3000,
              }
            );
          },
        });
    }

    this.router.navigate(['/services']);
  }
}
