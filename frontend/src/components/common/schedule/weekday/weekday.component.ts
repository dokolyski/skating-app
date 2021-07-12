import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {restUrls} from 'api/rest-urls';
import {TranslateService} from '@ngx-translate/core';
import {ProfileResponse} from 'api/responses/profile.dto';
import SessionResponse from 'api/responses/session.dto';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {RestService} from 'services/rest-service/rest.service';
import {EditSessionComponent} from 'components/pages/edit-session/edit-session.component';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent {
  @Input() sessions: SessionResponse[];
  @Input() date: Date;
  @Input() profiles: ProfileResponse[];
  @Output() newSessionCreated = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    public formatterService: FormatterService,
    private rest: RestService,
    private snackBar: MatSnackBar) {
  }

  openNewSessionForm() {
    this.dialog.open(EditSessionComponent, {data: {session: {start_date: this.date}, mode: 'create'}})
      .afterClosed().subscribe(next => {
      if (next != null) {
        this.rest.do(restUrls.SESSIONS.CREATE, {body: next}).subscribe(() => {
          this.newSessionCreated.emit();
          this.translateService.get('success.session-added').subscribe(message => {
            this.snackBar.open(message, 'OK', {duration: 2000});
          });
        });
      }
    });
  }

  isFuture(): boolean {
    return moment(this.date).isSameOrAfter(Date.now(), 'day');
  }
}
