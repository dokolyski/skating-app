import { SessionRequest as Session } from 'api/rest-models/session-request';
import { ProfileRequest as Profile } from 'api/rest-models/profile-request';
import { NewSessionFormComponent } from '../session-card/new-session-form/new-session-form.component';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent {
  @Input() sessions: Session[];
  @Input() date: Date;
  @Input() profiles: Profile[];
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
