import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() {
  }

  dayFormatter(date: Date): string {
    return moment(date).format('dddd[, ]DD[ ]MMM');
  }

  daysRangeFormatter(date_from: Date, date_to: Date): string {
    return `${moment(date_from).format('L')} - ${moment(date_to).format('L')}`;
  }

  dateWithTimeRange(date_from: Date, date_to: Date): string {
    return `${moment(date_from).format('MMMM Do YYYY, ')} ${moment(date_from).format('LT')} - ${moment(date_to).format('LT')}`;
  }

  dateWithTime(date_from: Date): string {
    return `${moment(date_from).format('MMMM Do YYYY, ')} ${moment(date_from).format('LT')}`;
  }

  shortenName(name: string, size: number = 22) {
    return name.length <= size ? name : name.substring(0, size - 3) + '...';
  }

  fullDateTimeString(date): string {
    return moment(date).format('LLLL');
  }

  shortenDateTimeString(date): string {
    return moment(date).format('llll');
  }
}
