import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page.component';
import { AccountSettingsModule } from './account/account-settings/account-settings.module';
import { ProfileAddModule } from './profile/profile-add/profile-add.module';
import { ProfileSettingsModule } from './profile/profile-settings/profile-settings.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountNotificationsModule } from './account/account-notifications/account-notifications.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        ProfileAddModule,
        ProfileSettingsModule,
        AccountSettingsModule,
        AccountNotificationsModule,
        TranslateModule
    ],
  declarations: [AccountPageComponent],
  exports: [AccountPageComponent]
})
export class AccountPageModule { }
