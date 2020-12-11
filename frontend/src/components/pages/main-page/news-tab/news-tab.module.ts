import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsTabComponent } from './news-tab.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NewsTabComponent],
  exports: [NewsTabComponent]
})
export class NewsTabModule { }
