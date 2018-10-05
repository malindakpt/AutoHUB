import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VProfileComponent } from './components-sub/v-profile/v-profile.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { AddNewsComponent } from './components/add-news/add-news.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/add-news', pathMatch: 'full' },
    { path: 'news', component: NewsItemComponent },
    { path: 'add-news', component: AddNewsComponent },
    { path: 'v-profile', component: VProfileComponent },
    { path: 'add', component: AddVehicleComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
