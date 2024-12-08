import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  accountDetail$ = this.authService.getDetail();
  isMenuOpen: boolean = false;
  searchVisible = false; // To toggle the visibility of the search bar
  searchQuery: string = '';

  ngOnInit() {
    this.accountDetail$.subscribe((user) => {
      console.log('User data:', user); // Check roles and name
    });
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      // Implement the search logic, e.g., navigate to a search results page
      console.log('Searching for:', this.searchQuery);
      // You could also trigger the search directly by calling an API or navigating to the search results page
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.matSnackBar.open('Logout Sucessful.', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }

  /*onSearch(searchTerm: string): void {
    this.router.navigate(['/search'], {
      queryParams: { location: searchTerm },
    });
  }*/
}
