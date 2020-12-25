import { Injectable } from '@angular/core';
import { RestError } from 'api/rest-error';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService } from 'services/language-service/Language.service';

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
export class LanguageErrorService {
  constructor(private readonly languageService: LanguageService) { }

  /**
   * @description Translate errors tokens into errors messages
   * @param restError received errors tokens from server
   * @returns ```Observable```, emits ```next``` with ```TranslatedErrors```
   */
  getErrorsStrings(restError: RestError): Observable<TranslatedErrors> {
    const subjectTranslation = new BehaviorSubject<TranslatedErrors>(null);
    const end = new Subject();

    this.languageService.dictionary$
    .pipe(
      takeUntil(end)
    )
    .subscribe(dict => {
      const translations = {};
      if (restError.messageToken) {
        const message = dict.errors.messages[restError.messageToken];
        translations['message'] = message;
      }

      if (restError.inputsTokens) {
        const inputs = Object.entries(restError.inputsTokens)
        .reduce((p, [k, v]) => ({...p, [k]: dict.errors.inputs[k][v]}), {});
        translations['inputs'] = inputs;
      }

      subjectTranslation.next(translations);
      end.next();
    });

    return subjectTranslation.asObservable();
  }
}
