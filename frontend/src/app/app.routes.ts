import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then(c => c.SignUpComponent),
    title: 'Sign Up',
    canActivate: [publicGuard]
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(c => c.SignInComponent),
    title: 'Sign In',
    canActivate: [publicGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./user/settings/settings.component').then(c => c.SettingsComponent),
    canActivate: [authGuard],
    title: 'Settings'
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/signin'
  }
];