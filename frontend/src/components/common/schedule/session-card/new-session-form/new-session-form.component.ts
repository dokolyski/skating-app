import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-new-session-form',
  templateUrl: './new-session-form.component.html',
  styleUrls: ['./new-session-form.component.css']
})
export class NewSessionFormComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}

