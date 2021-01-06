import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { InteractiveTableModule } from 'components/common/interactive-table/interactive-table.module';

@NgModule({
  imports: [
    CommonModule,
    InteractiveTableModule
  ],
  declarations: [AdminUsersComponent],
  exports: [AdminUsersComponent]
})
export class AdminUsersModule { }
