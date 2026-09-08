import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ClientHome } from './features/clients/pages/client-home/client-home';
import { OperatorHome } from './features/operators/pages/operator-home/operator-home';
import { roleGuard } from './features/auth/guards/role.guard';
import { guestGuard } from './features/auth/guards/guest.guard';
import { AppLayout } from './shared/layouts/app-layout/app-layout';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'client',
        component: ClientHome,
        canActivate: [roleGuard('CLIENT')],
      },
      {
        path: 'operator',
        component: OperatorHome,
        canActivate: [roleGuard('OPERATOR')],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
