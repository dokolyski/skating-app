import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as PATH from 'assets/config/url.json';

import { Pages } from 'components/pages/pages';
import { OrganizerGuard } from 'guards/Organizer.guard';
import { OnlineGuard } from 'guards/Online.guard';
import { NotLoggedGuard } from 'guards/NotLogged.guard';
import { AuthGuard } from 'guards/Auth.guard';

const routes: Routes = [
  /*EVERYONE*/
  { 
    path: PATH.EVERYONE.MAIN,
    component: Pages.AccountPageComponent//Pages.MainPageComponent
  },
  { 
    path: PATH.EVERYONE.NEWS,
    component: Pages.NewsPageComponent
  },
  { 
    path: PATH.EVERYONE.ABOUT_US,
    component: Pages.AboutUsPageComponent
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
    path: PATH.LOGGED.PROFILES, 
    component: Pages.ProfilesPageComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: PATH.LOGGED.SCHEDULE, 
    component: Pages.SchedulePageComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: PATH.LOGGED.SESSIONS, 
    component: Pages.SessionsPageComponent,
    canActivate: [AuthGuard]
  },
  /*ORGANIZER*/
  { 
    path: PATH.ORGANIZER.MANAGE_SCHEDULE, 
    component: Pages.ManageSchedulePageComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
  },
  { 
    path: PATH.ORGANIZER.ADD_SESSION, 
    component: Pages.AddSessionPageComponent,
    canActivate: [OnlineGuard, AuthGuard, OrganizerGuard]
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
