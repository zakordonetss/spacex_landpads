import { Routes } from '@angular/router';
import { LandpadsComponent } from './components/landpads/landpads.component';

export const routes: Routes = [
  { path: 'landpads', component: LandpadsComponent },
  { path: '', redirectTo: '/landpads', pathMatch: 'full' },
  { path: '**', redirectTo: '/landpads' },
];
