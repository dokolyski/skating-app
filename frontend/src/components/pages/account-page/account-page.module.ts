import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page.component';
import { LanguageService } from 'services/language-service/Language.service';
import { ProfileAddModule } from './profile-add/profile-add.module';
import { SettingsChangeModule } from './settings-change/settings-change.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileAddModule,
    SettingsChangeModule
  ],
  declarations: [AccountPageComponent],
  providers: [LanguageService]
})
export class AccountPageModule { }
