import {Injectable} from '@angular/core';
import {SessionParticipant} from 'models/session-participant';
import * as moment from 'moment';
import {BreakpointState} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ReservationTableFormatterService {

  constructor() {
  }

  sessionDateFormatter(start_date, end_date, xSmallScreen: boolean): string {
    if (xSmallScreen) {
      return moment(new Date(start_date)).format('lll');
    }

    const a = moment(new Date(start_date)).format('LLL');
    const b = moment(new Date(end_date)).format('LT');

    return `${a} - ${b}`;
  }

  handleScreenWidth(next: BreakpointState): {xSmallScreen: boolean, displayedColumns: string[]} {
    if (next.matches.valueOf()) {
      return {
        xSmallScreen: true,
        displayedColumns: ['participantName', 'sessionDate', 'price', 'remove']
      };
    }
    return {
      xSmallScreen: false,
      displayedColumns: ['participantName', 'sessionDate', 'sessionName', 'sessionGroup', 'price', 'remove']
    };
  }
}
