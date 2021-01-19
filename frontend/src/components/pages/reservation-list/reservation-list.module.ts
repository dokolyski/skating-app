import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationListComponent } from './reservation-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {CancelReservationDialogComponent} from 'components/pages/reservation-list/cancel-reservation-dialog/cancel-reservation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [ReservationListComponent, CancelReservationDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    TranslateModule,
    MatDialogModule
  ]
})
export class ReservationListModule { }
