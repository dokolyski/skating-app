import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminConfigModule } from './admin-config/admin-config.module';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    AdminUsersModule,
    AdminConfigModule,
    MiddleColumnModule
  ],
  declarations: [AdminPageComponent],
  exports: [AdminPageComponent]
})
export class AdminPageModule { }
