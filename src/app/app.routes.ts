import { Routes } from '@angular/router';
import { ErrorComponent } from "./components/error/error.component";
import { VAddComponent } from "src/app/components/v-add/v-add.component";
import { VProfileComponent } from "./components-sub/v-profile/v-profile.component";
import { NewsItemComponent } from './components/news-item/news-item.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/add', pathMatch: 'full' },
    { path: 'news', component: NewsItemComponent },
    { path: 'v-profile', component: VProfileComponent },
    { path: 'add', component: VAddComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
