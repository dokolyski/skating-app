import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';
import { TabRouterOutletModule } from 'components/common/tab-router-outlet/tab-router-outlet.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MiddleColumnModule,
    TabRouterOutletModule,
    TranslateModule
  ],
  declarations: [ReservationsComponent],
  exports: [ReservationsComponent]
})
export class ReservationsModule { }
