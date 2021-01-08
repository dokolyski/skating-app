import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toBoolean'
})
export class ToBooleanPipe implements PipeTransform {

  transform(value: string): boolean {
    return value === 'true';
  }

}
