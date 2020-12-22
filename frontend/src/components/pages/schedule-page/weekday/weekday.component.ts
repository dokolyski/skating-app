import {Component, Input, OnInit} from '@angular/core';
import {Session} from 'api/rest-models/session';
import {Profile} from 'api/rest-models/profile';

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
