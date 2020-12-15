import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountNotificationsComponent } from './account-notifications.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [AccountNotificationsComponent],
  exports: [AccountNotificationsComponent]
})
export class AccountNotificationsModule { }
