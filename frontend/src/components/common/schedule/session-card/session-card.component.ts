import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SessionInfoPaneComponent} from './session-info-pane/session-info-pane.component';
import * as moment from 'moment';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {AddParticipantDialogComponent} from './add-participant-dialog/add-participant-dialog.component';
import {ChooseParticipantDialogComponent} from './choose-participant-dialog/choose-participant-dialog.component';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import SessionResponse from 'api/responses/session.dto';
import {ProfileResponse} from 'api/responses/profile.dto';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css']
})
export class SessionCardComponent implements OnInit, OnDestroy {
  private s: Subscription;

  @Input() sessionData: SessionResponse;
  @Input() profiles: ProfileResponse[];

  startTime: string;
  endTime: string;
  participants: ProfileResponse[];
  blockIfAlreadyReserved;

  constructor(
    public dialog: MatDialog,
    private reservationsService: ReservationsService) { }

  openInfoPane() {
    this.dialog.open(SessionInfoPaneComponent, {
      data: {
        session: this.sessionData,
        profiles: this.profiles
      }
    })
    .afterClosed().subscribe((addParticipants: boolean) => {
      if (addParticipants) {
        this.addParticipantsService();
      }
    });
  }

  ngOnInit() {
    this.startTime = moment(this.sessionData.start_date).format('LT');
    this.endTime = moment(this.sessionData.end_date).format('LT');

    this.participants = this.reservationsService.getReservationsForSession(this.sessionData.id);

    this.s = this.reservationsService.reservationsChange
    .subscribe(() => {
      this.participants = this.reservationsService.getReservationsForSession(this.sessionData.id);
    });
    this.blockIfAlreadyReserved = (drag: CdkDrag<ProfileResponse>, drop: CdkDropList): boolean => {
      return !this.reservationsService.isAlreadyReserved({participant: drag.data, session: this.sessionData});
    };
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  dropProfile(event: CdkDragDrop<any>) {
    if (event.isPointerOverContainer) {
      const sessionParticipant = { session: this.sessionData, participant: event.item.data };

      this.dialog.open(AddParticipantDialogComponent, { data: sessionParticipant })
      .afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.addParticipants([event.item.data]);
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
    const data = { session: this.sessionData, profiles: this.profiles, alreadyAddedParticipants: this.participants };

    this.dialog.open(ChooseParticipantDialogComponent, { data })
    .afterClosed().subscribe((selectedParticipants: any[]) => {
      this.addParticipants(selectedParticipants);
    });
  }

  private addParticipants(selectedParticipants: any[]) {
    if (selectedParticipants != null && selectedParticipants.length > 0) {

      const newParticipants = selectedParticipants.map(value => ({
        participant: value,
        session: this.sessionData
      }));

      this.reservationsService.addNewParticipants(newParticipants);
    }
  }

  formatParticipantsList(participantsList: any[]): string {
    return participantsList.map(value => `${value.firstname} ${value.lastname}`).join('\n');
  }

  profilesBadgeStyle(color: string, moveLeft: boolean = false) {
    return {
      backgroundColor: color,
      right: moveLeft ? '17px' : '-10px'
    };
  }
}
