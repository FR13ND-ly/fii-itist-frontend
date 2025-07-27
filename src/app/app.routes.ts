import { Routes } from '@angular/router';
import { canScanGuard } from './core/guards/can-scan.guard';
import { logoutGuard } from './core/guards/logout.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'scanner',
    loadComponent: () =>
      import('./pages/scanner/scanner.component').then(
        (m) => m.ScannerComponent
      ),
      canActivate: [canScanGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
    canActivate: [logoutGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
      canActivate: [logoutGuard],
  }
  
];
