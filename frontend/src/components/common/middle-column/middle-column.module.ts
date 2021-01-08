import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleColumnComponent } from './middle-column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MiddleColumnComponent],
  exports: [MiddleColumnComponent]
})
export class MiddleColumnModule { }
