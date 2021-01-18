import {Component, Inject} from '@angular/core';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-reservation-dialog',
  templateUrl: './cancel-reservation-dialog.component.html',
  styleUrls: ['./cancel-reservation-dialog.component.css']
})
export class CancelReservationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public formatterService: FormatterService) { }

}
