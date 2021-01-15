import {EventEmitter} from '@angular/core';
import {Observable, of} from 'rxjs';

export class TranslateServiceMock {
  onTranslationChange = new EventEmitter<any>();
  onLangChange = new EventEmitter<any>();
  onDefaultLangChange = new EventEmitter<any>();
  public get(key: any): Observable<any> {
    return of(key);
  }
}
