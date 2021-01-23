import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as REST_PATH from 'api/rest-url.json';
import {TranslateService} from '@ngx-translate/core';
import {ProfileResponse} from 'api/responses/profile.dto';
import SessionResponse from 'api/responses/session.dto';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {RestService} from 'services/rest-service/rest.service';
import {EditSessionComponent} from 'components/pages/edit-session/edit-session.component';
import * as moment from 'moment';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent {
  @Input() sessions: SessionResponse[];
  @Input() date: Date;
  @Input() profiles: ProfileResponse[];

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    public formatterService: FormatterService,
    private rest: RestService) { }

  openNewSessionForm() {
    this.dialog.open(EditSessionComponent, { data: {session: {start_date: this.date}, mode: 'create' } })
    .afterClosed().subscribe(next => {
      if (next != null) {
        this.rest.do(REST_PATH.SESSIONS.CREATE, {body: next}).subscribe(next => {});
      }
    });
  }

  isFuture(): boolean {
    return moment(this.date).isSameOrAfter(Date.now(), 'day');
  }
}
