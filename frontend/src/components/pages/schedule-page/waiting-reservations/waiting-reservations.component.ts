import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SessionParticipant} from 'models/session-participant';
import * as moment from 'moment';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import {EventService} from 'services/event-service/event.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-waiting-reservations',
  templateUrl: './waiting-reservations.component.html',
  styleUrls: ['./waiting-reservations.component.css']
})
export class WaitingReservationsComponent implements OnInit {
  constructor(public reservationsService: ReservationsService,
              private eventService: EventService,
              private breakPointObserver: BreakpointObserver) {
  }

  dataSource: MatTableDataSource<SessionParticipant>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'price', 'remove'];
  xSmallScreen = true;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SessionParticipant>(this.reservationsService.data);
    this.eventService.reservationsChange.subscribe(data => {
      this.dataSource.data = [...data];
    });

    this.breakPointObserver.observe('(max-width: 600px)').subscribe(next => {
      if (next.matches.valueOf()) {
        this.xSmallScreen = true;
        this.displayedColumns = ['participantName', 'sessionDate', 'price', 'remove'];
      } else {
        this.xSmallScreen = false;
        this.displayedColumns = ['participantName', 'sessionDate', 'sessionName', 'sessionGroup', 'price', 'remove'];
      }
    });
  }

  participantNameFormatter(element: SessionParticipant): string {
    return `${element.participant.firstname} ${element.participant.lastname}`;
  }

  sessionDateFormatter(element: SessionParticipant): string {
    return this.xSmallScreen ? `${moment(new Date(element.session.start_date)).format('lll')}` : `${moment(new Date(element.session.start_date)).format('MMMM Do YYYY, HH:mm')} - ${moment(new Date(element.session.end_date)).format('HH:mm')}`;
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
}
