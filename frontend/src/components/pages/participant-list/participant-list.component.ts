import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import {ProfileSimplifiedResponse} from 'api/responses/profile.dto';
import {RestService} from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {FormatterService} from 'services/formatter-service/formatter.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private rest: RestService,
              public formatterService: FormatterService) {
  }

  ngOnInit(): void {
  }

  getAge(birth_date: Date) {
    return moment().diff(birth_date, 'years');
  }

  participantPresenceChange(participant: ProfileSimplifiedResponse) {
    this.rest.do<boolean>(REST_PATH.SESSION_PARTICIPANTS.EDIT_PRESENCE, {
      templateParamsValues: {id: participant.id.toString()},
      body: {present: !participant.present}
    }).subscribe(next => {
      this.data.participants.find(value => value.id === participant.id).present = next;
    });
  }
}
