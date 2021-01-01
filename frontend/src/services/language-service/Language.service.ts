import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

export type NodeTranslation = {
  [node: string]: NodeTranslation | any // string
};

/**
 * @description Fetch selected language file
 */
@Injectable()
export class LanguageService {
  private _language = null;
  private loadingSubject: Subject<NodeTranslation> = new Subject();
  private dictionarySubject: BehaviorSubject<NodeTranslation> = new BehaviorSubject<NodeTranslation>(null);
  readonly dictionary$: Observable<NodeTranslation> = this.dictionarySubject.asObservable();

 /**
  * @param language - initial language, first part of language file before sign `.` located in `path-languages`
  * @param path-languages path to the directory containing language files in format `<language_name>.language.json`
  */
  constructor(
    @Inject('language') language: string,
    @Inject('path-languages') private path: string) {
      this.language = localStorage.getItem('language');
      if(this.language === 'null') {
        this.language = language;
      }
    }

  get language(): string {
    return this._language;
  }

 /**
  * @description Set current language and loads translation from language file
  * @param name first part of language file before sign `.` located in `path-languages`
  */
  set language(name: string) {
    const destroy = new Subject();

    this.loadingSubject
    .pipe(
      takeUntil(destroy)
    ).subscribe(data => {
      destroy.next();
      this._language = name;
      this.dictionarySubject.next(data);
      localStorage.setItem('language', name);
    });

    this.readTranslation(`${name}.language.json`);
  }

  private readTranslation(fileName: string) {
    // dynamic import
    new Observable(s => {
      s.next(from(import(`../../${this.path}/${fileName}`)));
    })
    .pipe(
      mergeMap(v => v as any),
      map((v: {default}) => v.default)
    ).subscribe((data: NodeTranslation) => this.loadingSubject.next(data));
  }
}
