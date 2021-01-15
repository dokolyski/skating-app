import { NgModule } from '@angular/core';
import { SchedulePageComponent } from './schedule-page.component';
import { ScheduleModule } from '../../common/schedule/schedule.module';
import { WaitingReservationsComponent } from './waiting-reservations/waiting-reservations.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FullSecondaryBackgroundModule } from 'components/common/full-secondary-background/full-secondary-background.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FullSecondaryBackgroundModule,
    TranslateModule
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
export class SchedulePageModule { }
