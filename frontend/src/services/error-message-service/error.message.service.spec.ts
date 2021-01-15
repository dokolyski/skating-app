import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from './error.message.service';
import { filter } from 'rxjs/operators';
import { translation } from 'assets/mocks/unit-tests/error-message-service/config.json';
import { Observable, of } from 'rxjs';

export class TranslateServiceStub {
  public get(key: any): Observable<any> {
    return of(translation.errors);
  }
}

describe('error.message.service', () => {
  let errorMessageService: ErrorMessageService;

  beforeEach(async (done: DoneFn) => {
    await TestBed.configureTestingModule({
      providers: [
        ErrorMessageService,
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    }).compileComponents();

    errorMessageService = TestBed.inject(ErrorMessageService);
    done();
  });

  it('returns translated rest errors: generalized + inputs', (done: DoneFn) => {
    const messageToken = 'unauthorized';
    const email = 'not exists';
    
    errorMessageService.getErrorsStrings({
      messageToken,
      inputsTokens: { email }
    }).pipe(
      filter(x => x != null)
    ).subscribe(translatedErrors => {
      expect(translatedErrors.message).toEqual(translation.errors.messages[messageToken]);
      expect(translatedErrors.inputs.email).toEqual(translation.errors.inputs.email[email]);
      done();
    });
  });
});
