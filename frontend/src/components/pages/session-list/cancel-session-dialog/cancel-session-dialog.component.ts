import {Component, Inject} from '@angular/core';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-session-dialog',
  templateUrl: './cancel-session-dialog.component.html',
  styleUrls: ['./cancel-session-dialog.component.css']
})
export class CancelSessionDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public formatterService: FormatterService) { }

}
