import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SessionParticipant} from 'models/session-participant';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RestService} from 'services/rest-service/rest.service';
import {JoinRequest, JoinRequestPosition} from 'api/requests/session-participant.dto';
import {PaymentResponse} from 'api/responses/payment.dto';
import * as REST_PATH from 'api/rest-url.json';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JoinResponse} from 'api/responses/session-paricipant.dto';
import {MatDialog} from '@angular/material/dialog';
import {ReservationConfirmComponent} from 'components/pages/schedule-page/waiting-reservations/reservation-confirm/reservation-confirm.component';
import {ReservationTableFormatterService} from 'services/reservation-table-formatter-service/reservation-table-formatter.service';

@Component({
  selector: 'app-waiting-reservations',
  templateUrl: './waiting-reservations.component.html',
  styleUrls: ['./waiting-reservations.component.css']
})
export class WaitingReservationsComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();

  constructor(
    public reservationsService: ReservationsService,
    private breakPointObserver: BreakpointObserver,
    private restService: RestService,
    public dialog: MatDialog,
    public tableFormatter: ReservationTableFormatterService) {
  }

  dataSource: MatTableDataSource<SessionParticipant>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'price', 'remove'];
  xSmallScreen = true;
  paymentFormat: string;

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
      ).subscribe(next => {
      const settings = this.tableFormatter.handleScreenWidth(next);
      this.xSmallScreen = settings.xSmallScreen;
      this.displayedColumns = settings.displayedColumns;
    });
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  getTotalCost() {
    return this.dataSource.data
      .map(t => t.session.price)
      .reduce((acc, value) => acc + value, 0);
  }

  doReservation() {
    this.restService.do<JoinResponse>(REST_PATH.SESSION_PARTICIPANTS.JOIN, {
      body: {
        positions: this.dataSource.data.map(value => ({
          session_id: value.session.id,
          profile_id: value.participant.id
        } as JoinRequestPosition)), type: this.paymentFormat
      } as JoinRequest
    }).subscribe(next => {
      this.dialog.open(ReservationConfirmComponent, {
        data: {
          declared: this.dataSource.data,
          actual: next
        }
      }).afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.restService.do<PaymentResponse>(REST_PATH.PAYMENTS.CREATE, {
            body: {
              positions: next.positions.map(value => ({
                session_id: value.session_id,
                profile_id: value.profile_id
              })), type: this.paymentFormat
            } as JoinRequest
          }).subscribe(response => {
            this.reservationsService.clearParticipants();
            window.open(response.paymentLink);
          });
        }
      });
    });
  }
}
