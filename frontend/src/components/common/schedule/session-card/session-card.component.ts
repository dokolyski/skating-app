import {Component, Input, OnInit} from '@angular/core';
import {SessionRequest as Session} from 'api/rest-models/session-request';
import {MatDialog} from '@angular/material/dialog';
import {SessionInfoPaneComponent} from './session-info-pane/session-info-pane.component';
import * as moment from 'moment';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {AddParticipantDialogComponent} from './add-participant-dialog/add-participant-dialog.component';
import {ChooseParticipantDialogComponent} from './choose-participant-dialog/choose-participant-dialog.component';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';
import {ReservationsService} from 'services/reservations-service/reservations.service';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css']
})
export class SessionCardComponent implements OnInit {
  @Input() sessionData: Session;
  @Input() profiles: Profile[];
  startTime: string;
  endTime: string;
  participants: Profile[];
  blockIfAlreadyReserved;

  constructor(public dialog: MatDialog,
              private reservationsService: ReservationsService) {
  }

  openInfoPane() {
    this.dialog.open(SessionInfoPaneComponent, {
      data: {
        session: this.sessionData,
        profiles: this.profiles
      }
    }).afterClosed().subscribe((addParticipants: boolean) => {
      if (addParticipants) {
        this.addParticipantsService();
      }
    });
  }

  ngOnInit(): void {
    this.startTime = moment(this.sessionData.start_date).format('HH:mm');
    const endTime = new Date();
    endTime.setMinutes(this.sessionData.start_date.getMinutes() + 20);
    this.endTime = moment(endTime).format('HH:mm');
    this.participants = this.reservationsService.getReservationsForSession(this.sessionData.id);
    this.reservationsService.reservationsChange.subscribe(() => {
      this.participants = this.reservationsService.getReservationsForSession(this.sessionData.id);
    });
    const that = this;
    this.blockIfAlreadyReserved = (drag: CdkDrag<Profile>, drop: CdkDropList): boolean => {
      return !that.reservationsService.isAlreadyReserved({participant: drag.data, session: that.sessionData});
    };
  }

  dropProfile(event: CdkDragDrop<any>) {
    if (event.isPointerOverContainer) {
      const sessionParticipant = {session: this.sessionData, participant: event.item.data};
      const that = this;
      this.dialog.open(AddParticipantDialogComponent, {data: sessionParticipant}).afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          that.addParticipants([event.item.data]);
        }
      });
    }
  }

  addParticipantsButtonClicked(event?: MouseEvent) {
    if (event != null) {
      event.stopPropagation();
    }
    this.addParticipantsService();
  }

  private addParticipantsService() {
    const data = {session: this.sessionData, profiles: this.profiles, alreadyAddedParticipants: this.participants};
    const that = this;
    this.dialog.open(ChooseParticipantDialogComponent, {data}).afterClosed().subscribe((selectedParticipants: any[]) => {
      that.addParticipants(selectedParticipants);
    });
  }

  private addParticipants(selectedParticipants: any[]) {
    if (selectedParticipants != null && selectedParticipants.length > 0) {
      this.reservationsService.addNewParticipants(selectedParticipants.map(value => ({
        participant: value,
        session: this.sessionData
      })));
    }
  }

  formatParticipantsList(): string {
    return this.participants.map(value => `${value.firstname} ${value.lastname}`).join('\n');
  }
}
