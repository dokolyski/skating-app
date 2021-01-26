import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionParticipant} from 'models/session-participant';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProfileResponse} from 'api/responses/profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  data: SessionParticipant[];
  reservationsChange = new EventEmitter<SessionParticipant[]>();

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.restoreSessionParticipants();
  }

  getReservationsForSession(sessionId: number): ProfileResponse[] {
    return this.data
    .filter(sessionParticipant => sessionParticipant.session.id === sessionId)
    .map(value => value.participant);
  }

  addNewParticipants(newParticipants: SessionParticipant[]) {
    this.data = this.data.concat(newParticipants);
    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.data));
    this.reservationsChange.emit(this.data);
    if (newParticipants.length > 1) {
      this.displaySnackMessage('reservation-messages.many-added', {n: newParticipants.length});
    } else if (newParticipants.length === 1) {
      this.displaySnackMessage('reservation-messages.one-added', {participantName: `${newParticipants[0].participant.firstname} ${newParticipants[0].participant.lastname}`});
    }
  }

  clearParticipants() {
    window.localStorage.removeItem('sessionParticipants');
    this.reservationsChange.emit([]);
  }

  isAlreadyReserved(sessionParticipant: SessionParticipant): boolean {
    return this.data.some(value =>
      value.session.id === sessionParticipant.session.id && value.participant.id === sessionParticipant.participant.id)
      || sessionParticipant.session.profiles.some(value => value.id === sessionParticipant.participant.id);
  }

  deleteParticipants(sessionParticipants: SessionParticipant[]) {
    if (sessionParticipants != null && sessionParticipants.length > 0) {
      const beforeNumber = this.data.length;
      this.data = this.data.filter(value => {
        return !sessionParticipants.some(valueToDelete => {
          if (value.session.id === valueToDelete.session.id && value.participant.id === valueToDelete.participant.id) {
            return true;
          }
        });
      });

      const removedNumber = beforeNumber - this.data.length;
      if (removedNumber > 0) {
        this.reservationsChange.emit(this.data);
      }

      this.displayReservationsCanceledMessage(removedNumber);
    }

    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.data));
    return this.data;
  }

  private restoreSessionParticipants() {
    this.data = JSON.parse(window.localStorage.getItem('sessionParticipants')) ?? [];
    if (this.data.length > 0) {
      this.reservationsChange.emit(this.data);
    }
  }

  private displayNoReservationsCanceledMessage() {
    this.displaySnackMessage('Reservation has been canceled');
  }

  private displayReservationsCanceledMessage(canceledNumber: number) {
    if (canceledNumber === 1) {
      this.displaySnackMessage('reservation-messages.one-canceled');
    } else if (canceledNumber > 1) {
      this.displaySnackMessage('reservation-messages.many-canceled', {canceledNumber});
    }
  }

  private displaySnackMessage(message: string, params?: any) {
    this.translate.get(message, params).subscribe(next => {
      this.snackBar.open(next, null, {
        duration: 2000,
      });
    });
  }
}
