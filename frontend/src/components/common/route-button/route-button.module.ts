import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteButtonComponent } from './route-button.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AppIconDirective } from './app-icon.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  declarations: [RouteButtonComponent, AppIconDirective],
  exports: [RouteButtonComponent, AppIconDirective]
})
export class RouteButtonModule { }
