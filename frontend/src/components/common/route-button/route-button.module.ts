import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteButtonComponent } from './route-button.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  declarations: [RouteButtonComponent],
  exports: [RouteButtonComponent]
})
export class RouteButtonModule { }
