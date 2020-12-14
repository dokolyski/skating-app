import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { NOTIFICATIONS } from 'api/rest-types';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import { Notification } from 'api/rest-models'
import * as REST_PATH from 'api/rest-url.json'

@Component({
  selector: 'app-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.css']
})
export class AccountNotificationsComponent implements OnInit {
  notifications: Notification[]

  @Output()
  onCancel = new EventEmitter<void>()
  @Output()
  onError = new EventEmitter<string>()

  constructor(
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    this.rest.do<NOTIFICATIONS.GET_NOTIFICATIONS.OUTPUT>(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS)
      .subscribe({
        next: data => this.notifications = data,
        error: (e: RestError) => this.handleErrors(e)
      })
  }

  private handleErrors(error: RestError) {
    this.lngErrorService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.onError.emit(translation.message)
        }
      })
  }
}
