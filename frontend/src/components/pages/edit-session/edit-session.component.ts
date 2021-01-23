import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AuthService} from 'services/auth-service/auth.service';
import {SessionRequest} from 'api/requests/session.dto';
import * as moment from 'moment';
import SessionResponse from 'api/responses/session.dto';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  session: SessionResponse;
  uid: number;
  startTime: string;
  endTime: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { session: SessionResponse, mode: 'edit' | 'create' },
              private authService: AuthService) {
  }

  ngOnInit() {
    this.session = cloneDeep(this.data.session);
    this.startTime = moment(this.session.start_date).format('HH:mm');
    this.endTime = moment(this.session.end_date).format('HH:mm');
    this.authService.sessionInfo$.subscribe(next => {
      this.uid = next.uid;
    });
  }

  createSessionRequest() {
    const startTimeArray = this.startTime.split(':');
    const endTimeArray = this.endTime.split(':');

    this.session.start_date.setHours(parseInt(startTimeArray[0], 0));
    this.session.start_date.setMinutes(parseInt(startTimeArray[1], 0));

    this.session.end_date = moment(this.session.start_date).toDate();

    this.session.end_date.setHours(parseInt(endTimeArray[0], 0));
    this.session.end_date.setMinutes(parseInt(endTimeArray[1], 0));

    if (this.session.end_date < this.session.start_date) {
      this.session.end_date = moment(this.session.end_date).add(1, 'days').toDate();
    }
    return {
      ...this.session,
      status: 'OPEN',
      owner_id: this.uid
    };
  }
}
