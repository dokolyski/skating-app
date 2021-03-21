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

  timeRange(date_from, date_to): string {
    return `${moment(date_from).format('LT')} - ${moment(date_to).format('LT')}`;
  }


  getDifficultyParsed(difficulty: string) {
    return JSON.parse(difficulty);
  }

  groupFontColor(bgColor: string): string {
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);

    const lum = (.2126 * r + .7152 * g + .0722 * b) / 255;
    return lum > 0.5 ? '#000000' : '#ffffff';
  }
}
