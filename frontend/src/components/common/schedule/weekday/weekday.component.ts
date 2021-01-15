import { Component, Input } from '@angular/core';
import { NewSessionFormComponent } from '../session-card/new-session-form/new-session-form.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {ProfileResponse} from 'api/responses/profile.dto';
import SessionResponse from 'api/responses/session.dto';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent {
  @Input() sessions: SessionResponse[];
  @Input() date: Date;
  @Input() profiles: ProfileResponse[];
  @Input() adminView: boolean;

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService) { }

  openNewSessionForm() {
    this.dialog.open(NewSessionFormComponent, { data: { day: this.date } })
    .afterClosed().subscribe();
  }

  dayFormatter(): string {
    return moment(this.date).format('dddd[, ]DD[ ]MMM');
  }
}
