import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { map } from "rxjs/operators";

export type NodeTranslation = { 
  [node: string]: NodeTranslation | string
};

@Injectable()
export class LanguageService { 
  private dictionarySubject: BehaviorSubject<NodeTranslation> = new BehaviorSubject<NodeTranslation>(null);
  readonly dictionary$: Observable<NodeTranslation> = this.dictionarySubject.asObservable();

  constructor(
    @Inject("language") private _language: string,
    @Inject("path-languages") private path: string) {
      
    this.readTranslation(`${_language}.language.json`);
  }

  get language(): string {
    return this._language
  }

  set language(name: string) {
    this._language = name
    this.readTranslation(`${name}.language.json`)
  }

  private readTranslation(fileName: string) {
    new Observable<any>(s => {
      // dynamic import
      s.next(from(import(`${this.path}/${fileName}`)))
      s.complete()
    }).pipe(
      map(v => v.default)
    ).subscribe((data: NodeTranslation) => this.dictionarySubject.next(data))
  }
}
