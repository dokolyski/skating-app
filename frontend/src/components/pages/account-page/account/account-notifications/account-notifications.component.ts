import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestError } from 'api/rest-error';
import { RestService } from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {map, mergeMap} from 'rxjs/operators';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import SessionResponse from 'api/responses/session.dto';
import {SessionIndexRequest} from 'api/requests/session.dto';
import {NotificationResponse} from 'api/responses/notification.dto';

type Combined = {
  session_info: SessionResponse,
  notification_info: NotificationResponse
};

/**
 * @description Show notifications associated with account profiles
 */
@Component({
  selector: 'app-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.css']
})
export class AccountNotificationsComponent implements OnInit {
  sessions: Combined[];

  constructor(
    private rest: RestService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    const body: SessionIndexRequest = {
      date_from: new Date(),
      date_to: null
    };

    this.rest.do<SessionResponse[]>(REST_PATH.SESSIONS.GET_SESSIONS, {body})
      .pipe(
        mergeMap(s =>
          this.rest.do<NotificationResponse[]>(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS)
            .pipe(
              map(n => this.combine(s, n))
            )
        )
      )
      .subscribe({
        next: data => this.sessions = this.sortByExpTimeDesc(data),
        error: (e: RestError) => this.handleErrors(e)
      });
  }

  private combine(s: SessionResponse[], n: NotificationResponse[]): Combined[] {
    return n.map(v => {
      const session_info = s.filter(({id: session_id}) => session_id === v.session_id)[0];
      return { session_info, notification_info: v };
    });
  }

  private sortByExpTimeDesc(data: Combined[]): Combined[] {
    return data.sort((a, b) => {
      const bExpDate = b.notification_info.expiration_date.getTime();
      const aExpDate = a.notification_info.expiration_date.getTime();

      return bExpDate - aExpDate;
    });
  }

  private handleErrors(error: RestError) {
    this.errorMessageService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit(translation.message);
        }
      });
  }
}
