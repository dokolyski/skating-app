import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import {FormatterService} from 'services/formatter-service/formatter.service';

@Component({
  selector: 'app-session-info-pane',
  templateUrl: './session-info-pane.component.html',
  styleUrls: ['./session-info-pane.component.css']
})
export class SessionInfoPaneComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public formatterService: FormatterService) { }
}
