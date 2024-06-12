import { Routes } from '@angular/router';
import { LaunchpadsComponent } from './components/launchpads/launchpads.component';

export const routes: Routes = [
  { path: 'launchpads', component: LaunchpadsComponent },
  { path: '', redirectTo: '/launchpads', pathMatch: 'full' },
  { path: '**', redirectTo: '/launchpads' },
];
