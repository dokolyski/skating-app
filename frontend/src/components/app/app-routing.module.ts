import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as PATH from 'assets/config/url.json';

import { Pages } from 'components/pages/pages.module';
import { OrganizerGuard } from 'guards/Organizer.guard';
import { OnlineGuard } from 'guards/Online.guard';
import { NotLoggedGuard } from 'guards/NotLogged.guard';
import { AuthGuard } from 'guards/Auth.guard';
import { AdminGuard } from 'guards/Admin.guard';

const routes: Routes = [
  /*EVERYONE*/
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
        component: Pages.ReservationsComponent
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
    path: PATH.ORGANIZER.PARTICIPANTS,
    component: Pages.ManageSchedulePageComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
  },
  {
    path: PATH.ORGANIZER.MANAGE_SCHEDULE,
    component: Pages.ManageSchedulePageComponent,
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
