import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SessionParticipant} from 'models/session-participant';
import * as moment from 'moment';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RestService} from 'services/rest-service/Rest.service';
import {SessionParticipantJoinRequest} from 'api/requests/session-participant.dto';
import * as REST_PATH from 'api/rest-url.json';

@Component({
  selector: 'app-waiting-reservations',
  templateUrl: './waiting-reservations.component.html',
  styleUrls: ['./waiting-reservations.component.css']
})
export class WaitingReservationsComponent implements OnInit {
  constructor(public reservationsService: ReservationsService,
              private breakPointObserver: BreakpointObserver,
              private restService: RestService) {
  }

  dataSource: MatTableDataSource<SessionParticipant>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'price', 'remove'];
  xSmallScreen = true;
  private paymentFormat: string;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SessionParticipant>(this.reservationsService.data);
    this.reservationsService.reservationsChange.subscribe(data => {
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

  doReservation(profilesIds: any[] = []) {
    // TODO - to proper set after endpoint fix
    this.restService.do(REST_PATH.SESSION_PARTICIPANTS.JOIN, {body: {session_id: 0, profiles_ids: profilesIds, format: this.paymentFormat} as SessionParticipantJoinRequest });
  }
}
