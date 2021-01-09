import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as PATH from 'assets/config/url.json';

import { Pages } from 'components/pages/pages';
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
  /*LOGGED*/
  {
    path: PATH.LOGGED.ACCOUNT,
    component: Pages.AccountPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: PATH.LOGGED.SCHEDULE,
    component: Pages.SchedulePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: PATH.LOGGED.SHOP,
    component: Pages.ShopPageComponent,
    canActivate: [OnlineGuard, AuthGuard]
  },
  /*ORGANIZER*/
  /*ADMIN*/
  {
    path: PATH.ADMIN.DASHBOARD,
    component: Pages.AdminPageComponent,
    canActivate: [OnlineGuard, AuthGuard, AdminGuard]
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
