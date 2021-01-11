import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAccessAdminDirective } from './app-access-admin.directive';
import { AppAccessOrganizerDirective } from './app-access-organizer.directive';
import { AppAccessOnlineDirective } from './app-access-online.directive';
import { AppAccessOnlineButtonDirective } from './app-access-online-button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppAccessAdminDirective,
    AppAccessOrganizerDirective,
    AppAccessOnlineDirective,
    AppAccessOnlineButtonDirective
  ],
  exports: [
    AppAccessAdminDirective,
    AppAccessOrganizerDirective,
    AppAccessOnlineDirective,
    AppAccessOnlineButtonDirective
  ],
})
export class AccessControlModule { }
