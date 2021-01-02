import {Component, Input, OnInit} from '@angular/core';
import {SessionRequest as Session} from 'api/rest-models/session-request'
import {RestService} from 'services/rest-service/Rest.service';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() withProfilesDragging = false;
  @Input() adminView = false;
  weekdayNumbers = Array(7).fill(0).map((_, i) => i);

  calendar: {
    from: Date,
    to: Date
  };

  sessions: Session[][];
  profiles = [
    {id: 0, firstname: 'Dominik', lastname: 'Kalinowski'},
    {id: 1, firstname: 'Anna', lastname: 'Weidemann'},
    {id: 2, firstname: 'Arek', lastname: 'Nowacki'},
    {id: 3, firstname: 'Andrzej', lastname: 'Rawecki'},
    {id: 4, firstname: 'Kasia', lastname: 'Gałęzowska'}
  ] as Profile[];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.sessions = [
      [{
        id: 0,
        owner_id: 0,
        name: 'naemwer ew fwe ',
        start_date: new Date(),
        end_date: new Date(),
        max_participants: 10,
        difficulty: 'grupa srebrna',
        price: 35,
        description: 'oepwqeqwe weqo pewoq pewo peowqp ewq',
        status: 'open'
      },
        {
          id: 1,
          owner_id: 1,
          name: 'naemdaw dwa daw dwda',
          start_date: new Date(),
          end_date: new Date(),
          max_participants: 14,
          difficulty: 'grupa brązowa+',
          price: 35,
          description: 'oepwqeqoq wqp ewq',
          status: 'closed'
        }], [], [], [], [], [], []];
    // this.restService.do({METHOD: 'GET', URL: '/api/profiles', PARAMS: ['TODO.ADD.USER.ID']}, null).subscribe((value: any) => {
    //   this.profiles = value; // TODO - get
    // });
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
  }

  changeWeek(change: number) {
    this.calendar.from = moment(this.calendar.from).add(7 * change, 'days').toDate();
    this.calendar.to = moment(this.calendar.from).add(6, 'days').toDate();
  }

  getWeekdayDate(i: number): Date {
    return moment(this.calendar.from).add(i, 'days').toDate();
  }

  private updateSessions() {
    this.sessions = Array.from(Array(7), () => []);
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

  daysRangeFormatter(): string {
    return `${moment(this.calendar.from).format('L')} - ${moment(this.calendar.to).format('L')}`;
  }
}
