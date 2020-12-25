import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestError } from 'api/rest-error';
import { NOTIFICATIONS, SESSIONS } from 'api/rest-types';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import { Session } from 'api/rest-models/session';
import { Notification } from 'api/rest-models/notification';
import * as REST_PATH from 'api/rest-url.json';
import { map, mergeMap } from 'rxjs/operators';

/**
 * @description Show notifications associated with account profiles
 */
@Component({
  selector: 'app-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.css']
})
export class AccountNotificationsComponent implements OnInit {
  sessions: {
    session_info: Session,
    notification_info: Notification
  }[];

  @Output()
  onCancel = new EventEmitter<void>();
  @Output()
  onError = new EventEmitter<string>();

  constructor(
    private rest: RestService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    const body: SESSIONS.GET_SESSIONS.COMPILATION.INPUT = {
      date_from: new Date(),
      date_to: null
    };

    this.rest.do<SESSIONS.GET_SESSIONS.COMPILATION.OUTPUT>(REST_PATH.SESSIONS.GET_SESSIONS, { body })
      .pipe(
        mergeMap(s =>
          this.rest.do<NOTIFICATIONS.GET_NOTIFICATIONS.COMPILATION.OUTPUT>(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS)
            .pipe(
              map(n =>
                n.map(v => {
                  const session_info = s.filter(({id: session_id}) => session_id === v.session_id)[0];
                  return {session_info, notification_info: v};
                })
              )
            )
        )
      )
      .subscribe({
        next: data => {
          data = data.sort((a, b) => a.notification_info.expiration_date.getTime() - b.notification_info.expiration_date.getTime());
          this.sessions = data;
        },
        error: (e: RestError) => this.handleErrors(e)
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
