import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Session} from 'api/rest-models/session';
import {RestService} from 'services/rest-service/Rest.service';
import {Profile} from 'api/rest-models/profile';

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
  profiles = [
    {id: 0, firstname: 'Dominik', lastname: 'Kalinowski'},
    {id: 1, firstname: 'Anna', lastname: 'Weidemann'},
    {id: 2, firstname: 'Arek', lastname: 'Nowacki'},
    {id: 3, firstname: 'Andrzej', lastname: 'Rawecki'},
    {id: 4, firstname: 'Kasia', lastname: 'Gałęzowska'}
    ];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.clearSessions();
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
      if (empty) {
        return value.sessions.length === 0;
      } else {
        return value.sessions.length > 0;
      }
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
