import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { InteractiveTableModule } from 'components/common/interactive-table/interactive-table.module';
import { MatButtonModule } from '@angular/material/button';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    InteractiveTableModule,
    MatButtonModule,
    AccessControlModule,
    TranslateModule
  ],
  declarations: [AdminUsersComponent],
  exports: [AdminUsersComponent]
})
export class AdminUsersModule { }
