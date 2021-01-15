import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SessionParticipant } from 'models/session-participant';
import { ReservationsService } from 'services/reservations-service/reservations.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-waiting-reservations',
  templateUrl: './waiting-reservations.component.html',
  styleUrls: ['./waiting-reservations.component.css']
})
export class WaitingReservationsComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  
  constructor(
    public reservationsService: ReservationsService,
    private breakPointObserver: BreakpointObserver) { }

  dataSource: MatTableDataSource<SessionParticipant>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'price', 'remove'];
  xSmallScreen = true;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<SessionParticipant>(this.reservationsService.data);
    this.reservationsService.reservationsChange
    .pipe(
      takeUntil(this.destroySubject)
    ).subscribe(data => {
      this.dataSource.data = [...data];
    });

    this.breakPointObserver.observe('(max-width: 600px)')
    .pipe(
      takeUntil(this.destroySubject)
    ).subscribe(next => this.handleScreenWidth(next));
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  participantNameFormatter(element: SessionParticipant): string {
    return `${element.participant.firstname} ${element.participant.lastname}`;
  }

  sessionDateFormatter(element: SessionParticipant): string {
    if (this.xSmallScreen) {
      return `${moment(new Date(element.session.start_date)).format('lll')}`;
    }

    const a = moment(new Date(element.session.start_date)).format('MMMM Do YYYY, HH:mm');
    const b = moment(new Date(element.session.end_date)).format('HH:mm');

    return `${a} - ${b}`;
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
    return this.dataSource.data
      .map(t => t.session.price)
      .reduce((acc, value) => acc + value, 0);
  }

  private handleScreenWidth(next: BreakpointState) {
    if (next.matches.valueOf()) {
      this.xSmallScreen = true;
      this.displayedColumns = ['participantName', 'sessionDate', 'price', 'remove'];
    } else {
      this.xSmallScreen = false;
      this.displayedColumns = ['participantName', 'sessionDate', 'sessionName', 'sessionGroup', 'price', 'remove'];
    }
  }
}
