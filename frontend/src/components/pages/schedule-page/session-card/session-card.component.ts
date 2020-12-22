import {Component, Input, OnInit} from '@angular/core';
import {Session} from 'api/rest-models/session';
import {MatDialog} from '@angular/material/dialog';
import {SessionInfoPaneComponent} from './session-info-pane/session-info-pane.component';
import * as moment from 'moment';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AddParticipantDialogComponent} from './add-participant-dialog/add-participant-dialog.component';
import {EventService} from 'services/event-service/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChooseParticipantDialogComponent} from './choose-participant-dialog/choose-participant-dialog.component';
import {Profile} from 'api/rest-models/profile';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  @Input() sessionData: Session;
  @Input() profiles: Profile[];
  startTime: string;
  endTime: string;

  constructor(public dialog: MatDialog,
              private eventService: EventService,
              private snackBar: MatSnackBar) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SessionInfoPaneComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.startTime = moment(this.sessionData.start_date).format('HH:mm');
    const endTime = new Date();
    endTime.setMinutes(this.sessionData.start_date.getMinutes() + 20);
    this.endTime = moment(endTime).format('HH:mm');
  }

  dropProfile(event: CdkDragDrop<any>) {
    if (event.isPointerOverContainer) {
      const sessionParticipant = {session: this.sessionData, participant: event.item.data};
      const that = this;
      this.dialog.open(AddParticipantDialogComponent, {data: sessionParticipant}).afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          that.eventService.newSessionParticipantsEvent.emit([sessionParticipant]);
          this.snackBar.open('Participant added', null, {
            duration: 2000,
          });
        }
      });
    }
  }

  addParticipant(event: MouseEvent) {
    event.stopPropagation();
    const data = {session: this.sessionData, profiles: this.profiles};
    const that = this;
    this.dialog.open(ChooseParticipantDialogComponent, {data}).afterClosed().subscribe((selectedParticipants: any[]) => {
      if (selectedParticipants != null) {
        that.eventService.newSessionParticipantsEvent.emit(selectedParticipants.map(value => ({
          participant: value,
          session: this.sessionData
        })));
        this.snackBar.open('Participants added', null, {
          duration: 2000,
        });
      }
    });
  }
}
