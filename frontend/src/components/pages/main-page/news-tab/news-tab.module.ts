import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsTabComponent } from './news-tab.component';
import {FacebookModule} from 'ngx-facebook';

@NgModule({
  imports: [
    CommonModule,
    FacebookModule
  ],
  declarations: [NewsTabComponent],
  exports: [NewsTabComponent]
})
export class NewsTabModule { }
