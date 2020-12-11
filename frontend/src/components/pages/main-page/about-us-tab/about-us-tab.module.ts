import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsTabComponent } from './about-us-tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AboutUsTabComponent],
  exports: [AboutUsTabComponent]
})
export class AboutUsTabModule { }
