import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Customers } from './pages/customers/customers';
import { Imports } from './pages/imports/imports';
import { Audit } from './pages/audit/audit';
import { Login } from './auth/login/login';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      {
        path: 'customers',
        loadComponent: () =>
          import('mfeCustomers/Component').then(m => m.App)
      },
      { path: 'imports', component: Imports },
      { path: 'audit', component: Audit }
    ]
  }
];