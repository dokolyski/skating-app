import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from './LanguageError.service';
import { filter } from 'rxjs/operators';
import { translation } from 'assets/mocks/unit-tests/language-error-service/config.json';

describe('languageError.service', () => {
    let languageErrorService: LanguageErrorService;

    beforeEach(async (done: DoneFn) => {
        const mock = jasmine.createSpyObj('LanguageService', [], {dictionary$: of(translation)});
        await TestBed.configureTestingModule({
            providers: [
                LanguageErrorService,
                { provide: LanguageService, useValue: mock }
            ]
        }).compileComponents();

        languageErrorService = TestBed.inject(LanguageErrorService);
        done();
    });

    it('returns translated rest errors: generalized + inputs', (done: DoneFn) => {
        const messageToken = 'unauthorized';
        const email = 'not exists';
        languageErrorService.getErrorsStrings({
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
