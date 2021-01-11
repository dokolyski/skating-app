import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractiveTableComponent } from './interactive-table.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TrimPipe } from './trim.pipe';
import { IsBooleanPipe } from './isBoolean.pipe';
import { ToBooleanPipe } from './toBoolean.pipe';
import { AddDisabledDirective } from './add-disabled.directive';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [
    InteractiveTableComponent,
    TrimPipe,
    IsBooleanPipe,
    ToBooleanPipe,
    AddDisabledDirective
   ],
  exports: [
    InteractiveTableComponent,
    AddDisabledDirective
  ]
})
export class InteractiveTableModule { }
