import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Customers } from './pages/customers/customers';
import { Imports } from './pages/imports/imports';
import { Audit } from './pages/audit/audit';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'customers', component: Customers },
      { path: 'imports', component: Imports },
      { path: 'audit', component: Audit }
    ]
  }
];