import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {RestError} from 'api/rest-error';
import {first, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';

export type TranslatedErrors = {
  message?: string,
  inputs?: {
    [input: string]: string
  }
};

/**
 * @description Translate ```REST``` server errors tokens into ```client``` errors messages, messages depends on the selected ```language```
 */
@Injectable()
export class ErrorMessageService {
  constructor(private translate: TranslateService,
              private errorInterceptor: ErrorInterceptorService) {
  }

  /**
   * @description Translate errors tokens into errors messages
   * @param error received errors tokens from server
   * @returns ```Observable```, emits ```next``` with ```TranslatedErrors```
   */
  getErrorsStrings(error: HttpErrorResponse): Observable<TranslatedErrors> {
    if (error != null) {
      return this.translate.get('errors')
        .pipe(
          first(),
          map(dict => this.createTransObj(error, dict))
        );
    }
    return of({});
  }

  private createTransObj(error: HttpErrorResponse, dict) {
    const translations = {};
    const messageToken =  error?.error?.messageToken ?? error.message;
    if (messageToken) {
      translations['message'] = dict.messages[messageToken];
    }

    if (error?.error?.inputsTokens) {
      translations['inputs'] = Object.entries(error.error.inputsTokens)
        .reduce((p, [k, v]) => ({...p, [k]: dict.inputs[k][v as string]}), {});
    }

    return translations;
  }

  handleMessageError(httpError: HttpErrorResponse) {
    this.getErrorsStrings(httpError)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.errorInterceptor.error.emit({message: translation.message, status: httpError.status});
        } else {
          this.translate.get('errors.unknownError').subscribe(value => {
            this.errorInterceptor.error.emit({message: value, status: httpError.status});
          });
        }
      });
  }
}
