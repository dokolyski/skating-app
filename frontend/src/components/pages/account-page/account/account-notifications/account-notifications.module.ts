import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountNotificationsComponent } from './account-notifications.component';
import { MatExpansionModule } from '@angular/material/expansion';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [AccountNotificationsComponent],
  exports: [AccountNotificationsComponent]
};

@NgModule({
  imports: moduleInfo.imports,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class AccountNotificationsModule { }
