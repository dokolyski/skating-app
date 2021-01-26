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
import {AccessControlModule} from 'directives/access-control/access-control.module';
import { ReservationConfirmComponent } from './waiting-reservations/reservation-confirm/reservation-confirm.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FullSecondaryBackgroundModule,
    TranslateModule,
    AccessControlModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    SchedulePageComponent
  ],
  declarations: [
    SchedulePageComponent,
    WaitingReservationsComponent,
    ReservationConfirmComponent
  ],
  providers: []
})
export class SchedulePageModule { }
