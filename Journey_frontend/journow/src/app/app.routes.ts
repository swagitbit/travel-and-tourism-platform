import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { CitiesComponent } from './pages/cities/cities.component';
import { CitylistingComponent } from './pages/citylisting/citylisting.component';
import { ListingReviewComponent } from './pages/listing-review/listing-review.component';
import { BookingComponent } from './pages/booking/booking.component';
import { SearchComponent } from './search/search.component';
import { roleGuard } from './guards/role.guard';
import { UsersComponent } from './users/users.component';
import { RoleComponent } from './pages/role/role.component';
import { ServiceDashboardComponent } from './pages/service-dashboard/service-dashboard.component';
import { MyserviceComponent } from './pages/myservice/myservice.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { AdminComponent } from './pages/admin-panel/admin-panel.component';
import { ShowReviewComponent } from './pages/show-review/show-review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: 'admin/:listingId',
    component: ShowReviewComponent,
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'dashboard',
    component: ServiceDashboardComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['ServiceProvider'],
    },
  },
  {
    path: 'services',
    component: MyserviceComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['ServiceProvider'],
    },
  },
  {
    path: 'edit-service/:id',
    component: EditServiceComponent,
    data: {
      roles: ['ServiceProvider'],
    },
  },
  {
    path: 'cities',
    component: CitiesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cities/:location',
    component: CitylistingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cities/:loaction/:category/:listingid',
    component: ListingReviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'booking/:listingid',
    component: BookingComponent,
    canActivate: [authGuard],
  },
];
