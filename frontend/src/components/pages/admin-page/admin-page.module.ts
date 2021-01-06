import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminConfigModule } from './admin-config/admin-config.module';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    AdminUsersModule,
    AdminConfigModule
  ],
  declarations: [AdminPageComponent],
  exports: [AdminPageComponent]
})
export class AdminPageModule { }
