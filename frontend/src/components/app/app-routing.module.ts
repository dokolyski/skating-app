import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as PATH from 'assets/config/url.json';

import { NotLoggedGuard } from 'guards/notLogged.guard';
import { OrganizerGuard } from 'guards/organizer.guard';
import { OnlineGuard } from 'guards/online.guard';
import { AdminGuard } from 'guards/admin.guard';
import { AuthGuard } from 'guards/auth.guard';
import { Pages } from 'components/pages/pages.module';
import {TokenReaderComponent} from 'components/app/token-reader/token-reader.component';
import {ErrorPageComponent} from 'components/pages/error-page/error-page.component';
import {PaymentConfirmedPageComponent} from 'components/pages/payment-confirmed-page/payment-confirmed-page.component';

const routes: Routes = [
  /*EVERYONE*/
  {
    path: 'login_callback',
    component: TokenReaderComponent
  },
  {
    path: 'order_complete',
    component: PaymentConfirmedPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: PATH.EVERYONE.MAIN,
    component: Pages.MainPageComponent
  },
  {
    path: PATH.EVERYONE.REGISTER,
    component: Pages.RegisterPageComponent,
    canActivate: [OnlineGuard, NotLoggedGuard]
  },
  {
    path: PATH.EVERYONE.LOGIN,
    component: Pages.LoginPageComponent,
    canActivate: [OnlineGuard, NotLoggedGuard]
  },
  {
    path: PATH.EVERYONE.SCHEDULE,
    component: Pages.SchedulePageComponent
  },
  /*LOGGED*/
  {
    path: PATH.LOGGED.ACCOUNT,
    component: Pages.AccountPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'notifications',
        component: Pages.AccountNotificationsComponent
      },
      {
        path: 'reservations',
        component: Pages.ReservationListComponent
      },
      {
        path: 'settings',
        component: Pages.AccountSettingsComponent
      },
      {
        path: 'profile-add',
        component: Pages.ProfileAddComponent
      },
      {
        path: 'profile-settings',
        component: Pages.ProfileSettingsComponent
      }
    ]
  },
  {
    path: PATH.LOGGED.SHOP,
    component: Pages.ShopPageComponent,
    canActivate: [OnlineGuard, AuthGuard]
  },
  /*ORGANIZER*/
  {
    path: PATH.ORGANIZER.SESSIONS,
    component: Pages.SessionListComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
  },
  {
    path: PATH.ORGANIZER.MANAGE_SCHEDULE,
    component: Pages.ManageSchedulePageComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
  },
  {
    path: PATH.ORGANIZER.SEND_NOTIFICATION,
    component: Pages.NotificationSendingComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
  },
  /*ADMIN*/
  {
    path: PATH.ADMIN.DASHBOARD,
    component: Pages.AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'config',
        component: Pages.AdminConfigComponent
      },
      {
        path: 'users',
        component: Pages.AdminUsersComponent
      }
    ]
  },
  /*NOT FOUND*/
  {
    path: '**',
    redirectTo: PATH.EVERYONE.MAIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
