import {Injectable} from '@angular/core';
import {SessionParticipant} from 'models/session-participant';
import {EventService} from '../event-service/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  data: SessionParticipant[];

  constructor(private eventService: EventService,
              private snackBar: MatSnackBar) {
    this.data = JSON.parse(window.localStorage.getItem('sessionParticipants')) || [];
    if (this.data.length > 0) {
      this.eventService.reservationsChange.emit(this.data);
    }
  }

  getReservationsForSession(sessionId: number): Profile[] {
    return this.data.filter(sessionParticipant => {
      return sessionParticipant.session.id === sessionId;
    }).map(value => value.participant);
  }

  addNewParticipants(newParticipant: SessionParticipant[]) {
    this.data = this.data.concat(newParticipant);
    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.data));
    this.eventService.reservationsChange.emit(this.data);
  }

  isAlreadyReserved(sessionParticipant: SessionParticipant): boolean {
    return this.data.some(value => {
      if (value.session.id === sessionParticipant.session.id && value.participant.id === sessionParticipant.participant.id) {
        return true;
      }
    });
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
        this.eventService.reservationsChange.emit(this.data);
      }
      this.displayReservationsCanceledMessage(removedNumber);
    } else {
      this.displayNoReservationsCanceledMessage();
    }
    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.data));
    return this.data;
  }

  private displayNoReservationsCanceledMessage() {
    this.displaySnackMessage('Reservation has been canceled');
  }

  private displayReservationsCanceledMessage(canceledNumber: number) {
    if (canceledNumber === 0) {
      this.displayNoReservationsCanceledMessage();
    } else if (canceledNumber === 1) {
      this.displaySnackMessage(`Reservation has been canceled`);
    } else if (canceledNumber > 1) {
      this.displaySnackMessage(`${canceledNumber} reservations have been canceled`);
    } else {
      throw new Error('Number of canceling reservation was negative number.');
    }
  }

  private displaySnackMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
