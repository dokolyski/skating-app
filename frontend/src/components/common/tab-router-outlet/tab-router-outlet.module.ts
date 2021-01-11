import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabRouterOutletComponent } from './tab-router-outlet.component';
import { MiddleColumnModule } from '../middle-column/middle-column.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TabSubpageDirective } from './tab-subpage.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MiddleColumnModule,
    MatTabsModule,
    RouterModule
  ],
  declarations: [
    TabRouterOutletComponent,
    TabSubpageDirective
  ],
  exports: [
    TabRouterOutletComponent,
    TabSubpageDirective
  ]
})
export class TabRouterOutletModule { }
