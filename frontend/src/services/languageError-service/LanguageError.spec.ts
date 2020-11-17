import { TestBed } from "@angular/core/testing"
import { from, of } from "rxjs"
import { LanguageService } from "services/language-service/Language.service"
import { LanguageErrorService } from "./LanguageError.service"
import * as LANGUAGE_TEST from './language-test.language.json'

describe('languageError.service', () => {
    let languageErrorService: LanguageErrorService
    
    beforeEach(async (done: DoneFn) => {
        const mock = jasmine.createSpyObj('LanguageError', {}, {dictionary$: of(LANGUAGE_TEST['default'])})
        await TestBed.configureTestingModule({
            providers: [
                LanguageErrorService,
                { provide: LanguageService, useValue: mock }
            ]
        }).compileComponents()

        languageErrorService = TestBed.inject(LanguageErrorService)
        done()
    })

    it('returns translated rest errors: generalized + inputs', (done: DoneFn) => {
        const messageToken = 'unauthorized'
        const email = 'not exists'
        languageErrorService.getErrorsStrings({
            messageToken,
            inputsTokens: { email }
        }).subscribe(translatedErrors => {
            expect(translatedErrors.message).toEqual(LANGUAGE_TEST.errors.messages[messageToken])
            expect(translatedErrors.inputs['email']).toEqual(LANGUAGE_TEST.errors.inputs.email[email])
            done()
        })
    })
})