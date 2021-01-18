import {Component, OnInit} from '@angular/core';
import SessionResponse from 'api/responses/session.dto';
import {RestService} from 'services/rest-service/rest.service';
import {SessionIndexRequest, SessionStatusRequest} from 'api/requests/session.dto';
import * as REST_PATH from 'api/rest-url.json';
import {MatDialog} from '@angular/material/dialog';
import {ParticipantListComponent} from 'components/pages/participant-list/participant-list.component';
import {FormatterService} from 'services/formatter-service/formatter.service';
import * as moment from 'moment';
import {CancelSessionDialogComponent} from 'components/pages/session-list/cancel-session-dialog/cancel-session-dialog.component';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {EditSessionComponent} from 'components/pages/edit-session/edit-session.component';
import { isMobile } from 'common/functions/mobile-check';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
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

  showParticipantList(session: SessionResponse) {
    this.dialog.open(ParticipantListComponent, {data: {session}});
  }

  cancelSession(session: SessionResponse) {
    this.dialog.open(CancelSessionDialogComponent, {data: {session}}).afterClosed().subscribe(next => {
      if (next) {
        this.rest.do(REST_PATH.SESSIONS.EDIT_STATUS, {
          templateParamsValues: {id: session.id.toString()},
          body: {status: 'CANCELLED'} as SessionStatusRequest
        }).subscribe({
          error: (error) => {
            this.errorInterceptorService.error.emit(error); // TODO - human-ish error message
          }
        });
      }
    });
  }

  editSession(session: SessionResponse) {
    this.dialog.open(EditSessionComponent, { data: {session, mode: 'edit'} })
      .afterClosed().subscribe(next => {
      if (next != null) {
        this.rest.do(REST_PATH.SESSIONS.EDIT_STATUS, {body: next});
      }
    });
  }
}
