import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Session } from 'models/session';
import { RestService } from 'services/rest-service/Rest.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  weekdays: string[] = environment.session_schedule.weekdays;
  calendar: {
    from: Date,
    to: Date
  };

  sessions: Session[][];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.clearSessions();
    this.sessions = [
      [new Session(1, 2, 'nazwa', new Date(), 45, 10, 'MEDIUM', 35, 'opis. świetne zajęcia.', 'ENDED'),
      new Session(1, 2, 'nazwa', new Date(), 45, 10, 'MEDIUM', 35, 'opis. świetne zajęcia.', 'ENDED')], [], [], [], [], [], []];
    this.initializeCalendarSettings();
  }

  private initializeCalendarSettings() {
    const weekContainsDate: Date = new Date(Date.now());
    const weekFrom = new Date();
    const weekTo = new Date();
    weekFrom.setDate(weekContainsDate.getDate() - weekContainsDate.getDay() + 1);
    weekTo.setDate(weekFrom.getDate() + 7);
    this.calendar = {
      from: weekFrom,
      to: weekTo
    };
  }

  changeWeek(change: number) {
    this.calendar.from.setDate(this.calendar.from.getDate() + 7 * change);
    this.calendar.to.setDate(this.calendar.to.getDate() + 7 * change);
  }

  filterSessionsByEmptiness(empty: boolean) {
    return this.sessions.map((value, index) => ({
      sessions: value,
      index,
      weekday: this.weekdays[index]
    })).filter(value => {
      if (empty) { return value.sessions.length === 0; }
      else { return value.sessions.length > 0; }
    });
  }

  private getSessions() {
    this.restService.do<Session[]>({
      URL: '/api/sessions',
      METHOD: 'GET'
    }, {
      templateParamsValues: {
        date_from: this.calendar.from.toDateString(),
        date_to: this.calendar.to.toDateString()
      }
    }).subscribe(next => {
      this.putSessionsToWeekdays(next);
    });
  }

  private putSessionsToWeekdays(sessions: Session[]) {
    sessions.forEach(value => {
      this.sessions[value.start_date.getDay()].push(value);
    });
  }

  private clearSessions() {
    this.sessions = Array.from(Array(7), () => []);
  }

}
