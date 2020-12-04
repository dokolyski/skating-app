import { TestBed } from "@angular/core/testing"
import { filter, mergeMap } from "rxjs/operators"
import { LanguageService } from "./Language.service"
import * as LANG_DEFAULT from 'assets/mocks/unit-tests/language-service/default-test.language.json'
import * as LANG_CUSTOM from 'assets/mocks/unit-tests/language-service/custom-test.language.json';
import { custom_lang, default_lang } from 'assets/mocks/unit-tests/language-service/config.json';

describe('language.service', () => {
    let languageService: LanguageService

    beforeEach(async (done: DoneFn) => {
        await TestBed.configureTestingModule({
            providers: [
                LanguageService,
                { provide: 'language', useValue: default_lang },
                { provide: 'path-languages', useValue: 'assets/mocks/unit-tests/language-service' }
            ]
        }).compileComponents()
        
        languageService = TestBed.inject(LanguageService)
        done()
    })

    it('reads default language translation', (done: DoneFn) => {
        languageService.dictionary$
        .pipe(
            filter(() => languageService.language == default_lang)
        ).subscribe(translation => {
            expect(translation).toEqual(LANG_DEFAULT['default'])
            done()
        })
    })

    it('reads selected language translation', (done: DoneFn) => {
        languageService.dictionary$
        .pipe(
            filter(() => languageService.language == default_lang),
            mergeMap(() => {
                languageService.language = custom_lang
                return languageService.dictionary$
            }),
            filter(() => languageService.language == custom_lang)
        ).subscribe(translation => {
            expect(translation).toEqual(LANG_CUSTOM['default'])
            done()
        })
    })
})