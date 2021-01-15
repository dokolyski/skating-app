import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { RestError } from 'api/rest-error';
import { first, map } from 'rxjs/operators';

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
  constructor(private translate: TranslateService) { }

  /**
   * @description Translate errors tokens into errors messages
   * @param restError received errors tokens from server
   * @returns ```Observable```, emits ```next``` with ```TranslatedErrors```
   */
  getErrorsStrings(restError: RestError): Observable<TranslatedErrors> {
    return this.translate.get('errors')
    .pipe(
      first(),
      map(dict => this.createTransObj(restError, dict))
    );
  }

  private createTransObj(restError, dict) {
    const translations = {};
    if (restError.messageToken) {
      translations['message'] = dict.messages[restError.messageToken];
    }

    if (restError.inputsTokens) {
      translations['inputs'] = Object.entries(restError.inputsTokens)
        .reduce((p, [k, v]) => ({...p, [k]: dict.inputs[k][v as string]}), {});
    }

    return translations;
  }
}
