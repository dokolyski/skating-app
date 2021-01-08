import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isBoolean'
})
export class IsBooleanPipe implements PipeTransform {

  transform(value: string): boolean {
    return value === 'true' || value === 'false';
  }
}
