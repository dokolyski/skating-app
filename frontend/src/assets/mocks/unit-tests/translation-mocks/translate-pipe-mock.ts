import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';

@Pipe({name: 'translate'})
export class TranslatePipeMock implements PipeTransform {
  transform(query, ...args): string {
    return query;
  }

  updateValue(value: string): Observable<any> {
    return of(value);
  }
}
