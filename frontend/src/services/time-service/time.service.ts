import {Injectable} from '@angular/core';
import * as moment from 'moment';
import SessionResponse from 'api/responses/session.dto';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
  }

  initializeDateRangeForCurrentWeek() {
    const weekContainsDate: Date = new Date(Date.now());
    const date_from = moment(weekContainsDate).subtract((weekContainsDate.getDay() + 6) % 7, 'days').toDate();
    const date_to = moment(date_from).add(6, 'days').toDate();
    return this.getFullBorderDates(date_from, date_to);
  }

  getFullBorderDates(date_from, date_to) {
    date_from.setHours(0,0,0,0);
    date_to.setHours(23,59,59,999);
    return {date_from, date_to};
  }

  deserializeSessionDates(sessions: SessionResponse[]) {
    return sessions.map(value => ({
      ...value,
      createdAt: new Date(value.createdAt),
      updatedAt: new Date(value.updatedAt),
      start_date: new Date(value.start_date),
      end_date: new Date(value.end_date)
    }));
  }
}
