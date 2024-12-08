import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListingService } from '../../services/listing.service';
import { CityCard } from '../../interfaces/city-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatInputModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
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
