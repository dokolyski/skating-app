import {Component, Input, OnInit} from '@angular/core';
import {SessionIndexRequest} from 'api/requests/session.dto';
import {RestService} from 'services/rest-service/rest.service';
import {ProfileIndexRequest} from 'api/requests/profile.dto';
import {ProfileResponse} from 'api/responses/profile.dto';
import * as moment from 'moment';
import * as REST_PATH from 'api/rest-url.json';
import {AuthService} from 'services/auth-service/auth.service';
import SessionResponse from 'api/responses/session.dto';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() withProfilesDragging = false;
  @Input() adminView = false;
  weekdayNumbers = Array(7).fill(0).map((_, i) => i);

  calendar: { from: Date, to: Date };

  sessions: SessionResponse[][];
  profiles = [
    {id: 0, firstname: 'Dominik', lastname: 'Kalinowski'},
    {id: 1, firstname: 'Anna', lastname: 'Weidemann'},
    {id: 2, firstname: 'Arek', lastname: 'Nowacki'},
    {id: 3, firstname: 'Andrzej', lastname: 'Rawecki'},
    {id: 4, firstname: 'Kasia', lastname: 'Gałęzowska'}
  ] as ProfileResponse[]; // []; TODO - to replace after profiles loading will be working

  constructor(private restService: RestService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.sessionInfo$.subscribe(sessionInfo => {
      if (sessionInfo != null) {
        this.restService.do<ProfileResponse[]>(REST_PATH.PROFILES.GET, {body: {user_id: sessionInfo.uid} as ProfileIndexRequest})
          .subscribe(next => this.profiles = next );
      }
    });
    this.initializeCalendarSettings();
  }

  private initializeCalendarSettings() {
    const weekContainsDate: Date = new Date(Date.now());
    const weekFrom = moment(weekContainsDate).subtract(weekContainsDate.getDay() - 1, 'days').toDate();
    const weekTo = moment(weekFrom).add(6, 'days').toDate();
    this.calendar = {
      from: weekFrom,
      to: weekTo
    };
    this.updateSessions();
  }

  changeWeek(change: number) {
    this.calendar.from = moment(this.calendar.from).add(7 * change, 'days').toDate();
    this.calendar.to = moment(this.calendar.from).add(6, 'days').toDate();
    this.updateSessions();
  }

  getWeekdayDate(i: number): Date {
    return moment(this.calendar.from).add(i, 'days').toDate();
  }

  private updateSessions() {
    this.sessions = Array.from(Array(7), () => []);
    this.restService.do<SessionResponse[]>(REST_PATH.SESSIONS.GET_SESSIONS, {
        body: {
          date_from: this.calendar.from,
          date_to: this.calendar.to
        } as SessionIndexRequest
    }).subscribe(next => {
      this.putSessionsToWeekdays(next);
    });
  }

  private putSessionsToWeekdays(sessions: SessionResponse[]) {
    sessions.forEach(value => {
      this.sessions[value.start_date.getDay()].push(value);
    });
  }

  daysRangeFormatter(): string {
    return `${moment(this.calendar.from).format('L')} - ${moment(this.calendar.to).format('L')}`;
  }
}
