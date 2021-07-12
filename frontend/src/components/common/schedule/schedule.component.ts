import {Component, Input, OnInit} from '@angular/core';
import {SessionIndexRequest} from 'api/requests/session.dto';
import {RestService} from 'services/rest-service/rest.service';
import {ProfileResponse} from 'api/responses/profile.dto';
import * as moment from 'moment';
import {restUrls} from 'api/rest-urls';
import {AuthService} from 'services/auth-service/auth.service';
import SessionResponse from 'api/responses/session.dto';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {TimeService} from 'services/time-service/time.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  weekdayNumbers = Array(7).fill(0).map((_, i) => i);

  calendar: { from: Date, to: Date };

  sessions: SessionResponse[][];
  profiles = [];

  constructor(private restService: RestService,
              private authService: AuthService,
              public formatterService: FormatterService,
              private timeService: TimeService) {
  }

  ngOnInit() {
    this.restService.do<ProfileResponse[]>(restUrls.PROFILES.INDEX)
      .subscribe(next => this.profiles = next);
    this.initializeCalendarSettings();
  }

  private initializeCalendarSettings() {
    const timeRange = this.timeService.initializeDateRangeForCurrentWeek();
    this.calendar = {
      from: timeRange.date_from,
      to: timeRange.date_to
    };
    this.updateSessions();
  }

  changeWeek(change: number) {
    this.calendar.from = moment(this.calendar.from).add(7 * change, 'days').toDate();
    this.calendar.to = moment(this.calendar.from).add(7, 'days').toDate();
    this.updateSessions();
  }

  getWeekdayDate(i: number): Date {
    return moment(this.calendar.from).add(i, 'days').toDate();
  }

  updateSessions() {
    this.sessions = Array.from(Array(7), () => []);
    this.restService.do<SessionResponse[]>(restUrls.SESSIONS.GET_SESSIONS, {
      body: {
        date_from: this.calendar.from,
        date_to: this.calendar.to
      } as SessionIndexRequest
    }).subscribe(next => {
      this.putSessionsToWeekdays(next);
    });
  }

  private putSessionsToWeekdays(sessions: SessionResponse[]) {
    sessions = this.timeService.deserializeSessionDates(sessions);
    sessions.forEach(value => {
      this.sessions[(value.start_date.getDay() + 6) % 7].push(value);
    });
    this.sessions = this.sessions.map(value => value.sort((a, b) => a.start_date.valueOf() - b.start_date.valueOf()));
  }
}
