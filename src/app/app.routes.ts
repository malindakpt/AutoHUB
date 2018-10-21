import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleProfileComponent } from './components-sub/vehicle-profile/vehicle-profile.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuardService} from './services/auth.guard.service';
import {SecureComponent} from './components/secure/secure.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGuardService] },
    {
      path: 'secure', component: SecureComponent, canActivate: [AuthGuardService], children: [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'news', component: NewsItemComponent },
        { path: 'add-news', component: AddNewsComponent },
        { path: 'profile', component: VehicleProfileComponent },
        { path: 'add', component: AddVehicleComponent },
      ]
    },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
