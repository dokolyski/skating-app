import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../../models/session';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  @Input() sessionData: Session;

  constructor() { }

  ngOnInit(): void {
  }

}
