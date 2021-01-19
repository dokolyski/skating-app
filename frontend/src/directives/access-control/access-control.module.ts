import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAccessAdminDirective } from './app-access-admin.directive';
import { AppAccessOrganizerDirective } from './app-access-organizer.directive';
import { AppAccessOnlineDirective } from './app-access-online.directive';
import { AppAccessOnlineButtonDirective } from './app-access-online-button.directive';
import {AppAccessCommonUserDirective} from 'directives/access-control/app-access-common-user.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppAccessAdminDirective,
    AppAccessOrganizerDirective,
    AppAccessOnlineDirective,
    AppAccessOnlineButtonDirective,
    AppAccessCommonUserDirective
  ],
  exports: [
    AppAccessAdminDirective,
    AppAccessOrganizerDirective,
    AppAccessOnlineDirective,
    AppAccessOnlineButtonDirective,
    AppAccessCommonUserDirective
  ],
})
export class AccessControlModule { }
