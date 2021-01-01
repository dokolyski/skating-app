import {Component, Input, OnInit} from '@angular/core';
import {SessionRequest as Session} from 'api/rest-models/session-request';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {
  @Input() sessions: Session[];
  @Input() weekday: string;
  @Input() profiles: Profile[];

  constructor() { }

  ngOnInit(): void {
  }

}
