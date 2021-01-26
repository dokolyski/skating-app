import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JoinResponse, OrderPosition} from 'api/responses/session-paricipant.dto';
import {RestService} from 'services/rest-service/rest.service';
import {MatTableDataSource} from '@angular/material/table';
import {SessionParticipant} from 'models/session-participant';
import {ReservationTableFormatterService} from 'services/reservation-table-formatter-service/reservation-table-formatter.service';

@Component({
  selector: 'app-reservation-confirm',
  templateUrl: './reservation-confirm.component.html',
  styleUrls: ['./reservation-confirm.component.css']
})
export class ReservationConfirmComponent implements OnInit {

  constructor(
    private restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: { declared: SessionParticipant[], actual: JoinResponse },
    public tableFormatter: ReservationTableFormatterService) {
  }

  dataSource: MatTableDataSource<OrderPosition>;
  displayedColumns: string[] = ['participantName', 'sessionDate', 'price'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<OrderPosition>(this.data.actual.positions);
  }

}
