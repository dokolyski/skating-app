import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as PATH from 'assets/config/url.json';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { Pages, PagesModule } from 'components/pages/pages';
import { OrganizerGuard } from 'auth/OrganizerGuard';
import { OnlineGuard } from 'auth/OnlineGuard';

const authGuardPipe = () => redirectUnauthorizedTo(['/'])

const routes: Routes = [
  /*EVERYONE*/
  { 
    path: PATH.EVERYONE.MAIN,
    component: Pages.MainPageComponent
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
    canActivate: [OnlineGuard]
  },
  { 
    path: PATH.EVERYONE.LOGIN,
    component: Pages.LoginPageComponent,
    canActivate: [OnlineGuard]
  },
  /*LOGGED*/
  { 
    path: PATH.LOGGED.ACCOUNT, 
    component: Pages.AccountPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe } 
  },
  { 
    path: PATH.LOGGED.PROFILES, 
    component: Pages.ProfilesPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe } 
  },
  { 
    path: PATH.LOGGED.SCHEDULE, 
    component: Pages.SchedulePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe } 
  },
  { 
    path: PATH.LOGGED.SESSIONS, 
    component: Pages.SessionsPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe }
  },
  /*ORGANIZER*/
  { 
    path: PATH.ORGANIZER.MANAGE_SCHEDULE, 
    component: Pages.ManageSchedulePageComponent,
    canActivate: [OnlineGuard, AngularFireAuthGuard, OrganizerGuard],
    data: { authGuardPipe }
  },
  { 
    path: PATH.ORGANIZER.ADD_SESSION, 
    component: Pages.AddSessionPageComponent,
    canActivate: [OnlineGuard, AngularFireAuthGuard, OrganizerGuard],
    data: { authGuardPipe } 
  },
  /*NOT FOUND*/
  {
    path: '**',
    redirectTo: PATH.EVERYONE.MAIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AngularFireAuthModule, PagesModule],
  providers: [AngularFireAuth, OrganizerGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
