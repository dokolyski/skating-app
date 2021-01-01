import {NgModule} from '@angular/core';
import {SchedulePageComponent} from './schedule-page.component';
import {ScheduleModule} from '../../common/schedule/schedule.module';
import {WaitingReservationsComponent} from './waiting-reservations/waiting-reservations.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    ScheduleModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    SchedulePageComponent
  ],
  declarations: [
    SchedulePageComponent,
    WaitingReservationsComponent
  ],
  providers: []
})
export class SchedulePageModule {
}
