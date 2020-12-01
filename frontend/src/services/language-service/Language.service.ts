import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, from, Observable, Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";

export type NodeTranslation = { 
  [node: string]: NodeTranslation | any // string
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService { 
  private _language = null
  private loadingSubject: Subject<NodeTranslation> = new Subject()
  private dictionarySubject: BehaviorSubject<NodeTranslation> = new BehaviorSubject<NodeTranslation>(null);
  readonly dictionary$: Observable<NodeTranslation> = this.dictionarySubject.asObservable();

  constructor(
    @Inject("language") language: string,
    @Inject("path-languages") private path: string) {
      this.language = language
    }

  get language(): string {
    return this._language
  }

  set language(name: string) {
    const end = new Subject()
   
    this.loadingSubject
    .pipe(
      takeUntil(end)
    ).subscribe(data => {
      end.next()
      this._language = name
      this.dictionarySubject.next(data)
    })

    this.readTranslation(`${name}.language.json`)
  }

  private readTranslation(fileName: string) {
    new Observable<any>(s => {
      // dynamic import
      s.next(from(import(`../../${this.path}/${fileName}`)))
    }).pipe(
      mergeMap(v => v),
      map(v => v['default'])
    ).subscribe((data: NodeTranslation) => this.loadingSubject.next(data))
  }
}
