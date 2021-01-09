import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';
import { TabRouterOutletModule } from 'components/common/tab-router-outlet/tab-router-outlet.module';

@NgModule({
  imports: [
    CommonModule,
    MiddleColumnModule,
    TabRouterOutletModule
  ],
  declarations: [AdminPageComponent],
  exports: [AdminPageComponent]
})
export class AdminPageModule { }
