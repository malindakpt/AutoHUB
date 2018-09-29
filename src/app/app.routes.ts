import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from "./components/error/error.component";

export const appRoutes: Routes = [
    { path: '', component: MainLayoutComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
