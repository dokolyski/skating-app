import { Injectable } from "@angular/core";
import { RestError } from "api/rest-error";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LanguageService } from "services/language-service/Language.service";

export type TranslatedErrors = {
  message?: string,
  inputs?: {
    [input: string]: string
  }
}

@Injectable()
export class LanguageErrorService {
  constructor(private readonly languageService: LanguageService) { }

  getErrorsStrings(restError: RestError): Observable<TranslatedErrors> {
    const subject = new Subject<TranslatedErrors>();
    
    this.languageService.dictionary$
    .pipe(
      takeUntil(subject)
    )
    .subscribe(dict => {
      const translations = {}
      if(restError.messageToken) {
        const message = dict.errors['messages'][restError.messageToken]
        translations['message'] = message
      }
      
      if(restError.inputsTokens) {
        const inputs = Object.entries(restError.inputsTokens)
        .reduce((p, [k, v]) => ({...p, [k]: dict.errors['inputs'][k][v]}), {})
        translations['inputs'] = inputs
      }
      
      subject.next(translations)
      subject.complete()
    })

    return subject.asObservable()
  }
}
