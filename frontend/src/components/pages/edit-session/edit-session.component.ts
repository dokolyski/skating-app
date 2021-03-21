import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from 'services/auth-service/auth.service';
import * as moment from 'moment';
import SessionResponse from 'api/responses/session.dto';
import * as cloneDeep from 'lodash.clonedeep';
import {RestService} from 'services/rest-service/rest.service';
import {ConfigResponse} from 'api/responses/config.dto';
import * as REST_PATH from 'api/rest-url.json';
import * as REST_CONFIG from 'assets/config/config.rest.json';

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
  groupOptions: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { session: SessionResponse, mode: 'edit' | 'create' },
              private authService: AuthService,
              private rest: RestService) {
  }

  ngOnInit() {
    this.session = cloneDeep(this.data.session);
    this.startTime = moment(this.session.start_date).format('HH:mm');
    this.endTime = moment(this.session.end_date).format('HH:mm');
    this.authService.sessionInfo$.subscribe(next => {
      this.uid = next.uid;
    });
    this.rest.do<ConfigResponse>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: REST_CONFIG.skills}})
      .subscribe((data: ConfigResponse) => this.groupOptions = JSON.parse(data.value));
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

  stringifyGroup(group: any) {
    return JSON.stringify(group);
  }
}
