import { Injectable } from '@angular/core';
import {EventEmitter} from '@angular/core';
import {SessionParticipant} from 'models/session-participant';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  newSessionParticipantsEvent = new EventEmitter<SessionParticipant[]>();
  deleteSessionParticipantsEvent = new EventEmitter<SessionParticipant[]>();
}
