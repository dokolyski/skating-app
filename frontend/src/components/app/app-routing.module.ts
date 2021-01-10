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
    path: '',
    component: Pages.MainPageComponent
  },
  {
    path: 'register',
    component: Pages.RegisterPageComponent,
    canActivate: [OnlineGuard, NotLoggedGuard]
  },
  {
    path: 'login',
    component: Pages.LoginPageComponent,
    canActivate: [OnlineGuard, NotLoggedGuard]
  },
  /*LOGGED*/
  {
    path: 'account',
    component: Pages.AccountPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'notifications',
        component: Pages.AccountNotificationsComponent
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
    path: 'schedule',
    component: Pages.SchedulePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    component: Pages.ShopPageComponent,
    canActivate: [OnlineGuard, AuthGuard]
  },
  /*ORGANIZER*/
  /*ADMIN*/
  {
    path: 'admin',
    component: Pages.AdminPageComponent,
    canActivate: [OnlineGuard, AuthGuard, AdminGuard],
    canActivateChild: [OnlineGuard, AuthGuard, AdminGuard],
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
