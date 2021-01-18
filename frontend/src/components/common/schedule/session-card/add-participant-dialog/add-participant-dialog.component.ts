import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import {FormatterService} from 'services/formatter-service/formatter.service';

@Component({
  selector: 'app-add-participant-dialog',
  templateUrl: './add-participant-dialog.component.html',
  styleUrls: ['./add-participant-dialog.component.css']
})
export class AddParticipantDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public formatterService: FormatterService) { }

  changeSetting(event: MatCheckboxChange) {
  }
}
