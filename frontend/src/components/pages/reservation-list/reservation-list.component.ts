import { Component, OnInit } from '@angular/core';
import SessionResponse from 'api/responses/session.dto';
import {RestService} from 'services/rest-service/rest.service';
import {MatDialog} from '@angular/material/dialog';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {isMobile} from 'common/functions/mobile-check';
import * as REST_PATH from 'api/rest-url.json';
import {SessionIndexRequest} from 'api/requests/session.dto';
import * as moment from 'moment';
import {CancelReservationDialogComponent} from 'components/pages/reservation-list/cancel-reservation-dialog/cancel-reservation-dialog.component';
import {DisjoinRequest} from 'api/requests/session-participant.dto';
import {MatListOption} from '@angular/material/list';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  sessions: SessionResponse[] = [];
  date_from: Date;
  date_to: Date;
  isMobile = isMobile();
  render = false;

  constructor(private rest: RestService,
              public dialog: MatDialog,
              public formatterService: FormatterService,
              private errorInterceptorService: ErrorInterceptorService) {
  }

  ngOnInit(): void {
    const weekContainsDate: Date = new Date(Date.now());
    this.date_from = moment(weekContainsDate).subtract(weekContainsDate.getDay() - 1, 'days').toDate();
    this.date_to = moment(this.date_from).add(6, 'days').toDate();

    this.rest.do<SessionResponse[]>(REST_PATH.SESSIONS.GET_SESSIONS, {
      body: {
        date_from: this.date_from,
        date_to: this.date_to
      } as SessionIndexRequest
    }).subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  cancelReservations(session: SessionResponse, selected: MatListOption[]) {
    this.dialog.open(CancelReservationDialogComponent, {data: {session}}).afterClosed().subscribe(next => {
      if (next) {
        this.rest.do(REST_PATH.SESSION_PARTICIPANTS.LEAVE, {
          templateParamsValues: {id: session.id.toString()},
          body: {session_id: session.id, profiles_ids: selected.map(value => value.value)} as DisjoinRequest
        }).subscribe({
          error: (error) => {
            this.errorInterceptorService.error.emit(error); // TODO - human-ish error message
          }
        });
      }
    });
  }
}

