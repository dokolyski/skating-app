import {Component, OnInit} from '@angular/core';
import {EventService} from 'services/event-service/Event.service';
import {MatTableDataSource} from '@angular/material/table';
import {SessionParticipant} from 'models/session-participant';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-waiting-reservations',
  templateUrl: './waiting-reservations.component.html',
  styleUrls: ['./waiting-reservations.component.css']
})
export class WaitingReservationsComponent implements OnInit {
  constructor(private eventService: EventService,
              private snackBar: MatSnackBar) {
  }

  dataSource: MatTableDataSource<SessionParticipant>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'sessionName', 'sessionGroup', 'price', 'remove'];

  addNewParticipants(newParticipant: SessionParticipant[]) {
    this.dataSource.data = [...this.dataSource.data, ...newParticipant];
    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.dataSource.data));
  }

  deleteParticipant(sessionParticipant?: SessionParticipant[], index?: number) {
    if (sessionParticipant != null && sessionParticipant.length > 0) {
      const beforeNumber = this.dataSource.data.length;
      this.dataSource.data = [...this.dataSource.data.filter(
        value => {
          let isFilter = true;
          sessionParticipant.forEach(valueToDelete => {
            if (value.session.id === valueToDelete.session.id && value.participant.id === valueToDelete.participant.id) {
              isFilter = false;
              return;
            }
          });
          return isFilter;
        })];
      if (beforeNumber === this.dataSource.data.length) {
        this.displaySnackMessage('No reservations have been canceled');
      } else {
        this.displaySnackMessage(`${beforeNumber - this.dataSource.data.length} reservations have been canceled`);
      }
    } else if (index != null && index < this.dataSource.data.length) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
      this.displaySnackMessage('Reservation have been canceled');
    } else {
      this.displaySnackMessage('No reservations have been canceled');
    }
    window.localStorage.setItem('sessionParticipants', JSON.stringify(this.dataSource.data));
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SessionParticipant>(JSON.parse(window.localStorage.getItem('sessionParticipants')) || []);
    const that = this;
    this.eventService.newSessionParticipantsEvent.subscribe(
      participant => that.addNewParticipants(participant));
    this.eventService.deleteSessionParticipantsEvent.subscribe(
      participant => that.deleteParticipant(participant));
  }

  participantNameFormatter(element: SessionParticipant): string {
    return `${element.participant.firstname} ${element.participant.lastname}`;
  }

  sessionDateFormatter(element: SessionParticipant): string {
    return new Date(element.session.start_date).toString();
  }

  sessionNameFormatter(element: SessionParticipant): string {
    return element.session.name;
  }

  sessionGroupFormatter(element: SessionParticipant): string {
    return element.session.difficulty;
  }

  sessionPriceFormatter(element: SessionParticipant): string {
    return element.session.price.toString();
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.session.price).reduce((acc, value) => acc + value, 0);
  }

  displaySnackMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
