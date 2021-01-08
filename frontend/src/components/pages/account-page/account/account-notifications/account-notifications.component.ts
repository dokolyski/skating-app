import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestError } from 'api/rest-error';
import { NOTIFICATIONS, SESSIONS } from 'api/rest-types';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import { SessionRequest as Session } from 'api/rest-models/session-request';
import { Notification } from 'api/rest-models/notification';
import * as REST_PATH from 'api/rest-url.json';
import { map, mergeMap } from 'rxjs/operators';

type Combined = {
  session_info: Session,
  notification_info: Notification
}

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

  @Output()
  onError = new EventEmitter<string>();

  constructor(
    private rest: RestService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    const body: SESSIONS.INDEX.INPUT = {
      date_from: new Date(),
      date_to: null
    };

    this.rest.do<SESSIONS.INDEX.OUTPUT>(REST_PATH.SESSIONS.GET_SESSIONS, { body })
      .pipe(
        mergeMap(s =>
          this.rest.do<NOTIFICATIONS.GET_NOTIFICATIONS.COMPILATION.OUTPUT>(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS)
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

  private combine(s: Session[], n: Notification[]): Combined[] {
    return n.map(v => {
      const session_info = s.filter(({id: session_id}) => session_id === v.session_id)[0];
      return { session_info, notification_info: v };
    })
  }

  private sortByExpTimeDesc(data: Combined[]): Combined[] {
    return data.sort((a, b) => {
      const bExpDate = b.notification_info.expiration_date.getTime();
      const aExpDate = a.notification_info.expiration_date.getTime();
      
      return bExpDate - aExpDate;
    });
  }

  private handleErrors(error: RestError) {
    this.lngErrorService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.onError.emit(translation.message);
        }
      });
  }
}
