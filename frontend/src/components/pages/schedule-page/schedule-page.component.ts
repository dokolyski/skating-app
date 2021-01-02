import {Component, OnInit} from '@angular/core';
import {RestService} from 'services/rest-service/Rest.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {

  constructor(private restService: RestService) {
  }

  ngOnInit() {
  }

}
