import {Component, OnInit} from '@angular/core';
import SessionResponse from 'api/responses/session.dto';
import {RestService} from 'services/rest-service/rest.service';
import {SessionIndexRequest, SessionStatusRequest} from 'api/requests/session.dto';
import {restUrls} from 'api/rest-urls';
import {MatDialog} from '@angular/material/dialog';
import {ParticipantListComponent} from 'components/pages/participant-list/participant-list.component';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {CancelSessionDialogComponent} from 'components/pages/session-list/cancel-session-dialog/cancel-session-dialog.component';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {EditSessionComponent} from 'components/pages/edit-session/edit-session.component';
import {TimeService} from 'services/time-service/time.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions: SessionResponse[] = [];
  date_from: Date;
  date_to: Date;
  render = false;

  constructor(private rest: RestService,
              public dialog: MatDialog,
              public formatterService: FormatterService,
              private errorInterceptorService: ErrorInterceptorService,
              private timeService: TimeService) {
  }

  ngOnInit(): void {
    const timeRange = this.timeService.initializeDateRangeForCurrentWeek();
    this.date_from = timeRange.date_from;
    this.date_to = timeRange.date_to;
    this.loadSessionsFromDateRange();
  }

  showParticipantList(session: SessionResponse) {
    this.dialog.open(ParticipantListComponent, {data: {session}});
  }

  cancelSession(session: SessionResponse) {
    this.dialog.open(CancelSessionDialogComponent, {data: {session}}).afterClosed().subscribe(next => {
      if (next) {
        this.rest.do(restUrls.SESSIONS.EDIT_STATUS, {
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
        this.rest.do(restUrls.SESSIONS.EDIT, {templateParamsValues: {id: session.id.toString()}, body: next}).subscribe(next => {});
      }
    });
  }

  loadSessionsFromDateRange() {
    const timeRange = this.timeService.getFullBorderDates(this.date_from, this.date_to);
    this.rest.do<SessionResponse[]>(restUrls.SESSIONS.GET_SESSIONS, {
      body: {
        date_from: timeRange.date_from,
        date_to: timeRange.date_to
      } as SessionIndexRequest
    }).subscribe(sessions => {
      this.sessions = this.timeService.deserializeSessionDates(sessions);
    });
  }
}
