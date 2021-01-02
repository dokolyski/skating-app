import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-session-info-pane',
  templateUrl: './session-info-pane.component.html',
  styleUrls: ['./session-info-pane.component.css']
})
export class SessionInfoPaneComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  formatDateString() {
    return `${moment(this.data.session.start_date).format('MMMM Do YYYY, HH:mm')} - ${moment(this.data.session.end_date).format('HH:mm')}`;
  }
}
