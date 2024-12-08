import { Component, inject } from '@angular/core';
import { CityCard } from '../../interfaces/city-card';
import { ListingService } from '../../services/listing.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css',
})
export class CitiesComponent {
  listingService = inject(ListingService);
  cityCards: CityCard[] = [];

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.listingService.getCities().subscribe({
      next: (data) => {
        this.cityCards = data;
      },
      error: (err) => {
        console.error('Failed to fetch cities', err);
      },
    });
  }
}
