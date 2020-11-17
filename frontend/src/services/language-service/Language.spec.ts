import { TestBed } from "@angular/core/testing"
import { LanguageService } from "./Language.service"
import * as LANG_DEFAULT from './default-test.language.json'
import * as LANG_CUSTOM from './custom-test.language.json'

describe('language.service', () => {
    const default_lang = 'default-test'
    const custom_lang = 'custom-test'
    let languageService: LanguageService

    beforeEach(async (done: DoneFn) => {
        await TestBed.configureTestingModule({
            providers: [
                LanguageService,
                { provide: 'language', useValue: default_lang },
                { provide: 'path-languages', useValue: 'services/language-service' }
            ]
        }).compileComponents()
        
        languageService = TestBed.inject(LanguageService)
        done()
    })

    it('reads default language translation', (done: DoneFn) => {
        expect(languageService.language).toEqual(default_lang)
        languageService.dictionary$.subscribe(translation => {
            expect(translation).toEqual(LANG_DEFAULT)
            done()
        })
    })

    it('reads selected language translation', (done: DoneFn) => {
        languageService.language = custom_lang
        expect(languageService.language).toEqual(custom_lang)
        languageService.dictionary$.subscribe(translation => {
            expect(translation).toEqual(LANG_CUSTOM)
            done()
        })
    })
})