import { Routes } from '@angular/router';
import { ErrorComponent } from "./components/error/error.component";
import { VAddComponent } from "src/app/components-sub/v-add/v-add.component";
import { VProfileComponent } from "./components-sub/v-profile/v-profile.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/v-add', pathMatch: 'full' },
    { path: 'v-profile', component: VProfileComponent },
    { path: 'v-add', component: VAddComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
