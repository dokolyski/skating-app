import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminConfigComponent } from './admin-config.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InteractiveTableModule } from 'components/common/interactive-table/interactive-table.module';
import { InputsModule } from 'components/common/inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    InteractiveTableModule,
    InputsModule,
    FormsModule,
  ],
  declarations: [
    AdminConfigComponent
  ],
  exports: [AdminConfigComponent]
})
export class AdminConfigModule { }
