import {Session} from 'api/rest-models/session';
import {Profile} from 'api/rest-models/profile';

export class SessionParticipant {
  session: Session;
  participant: Profile;
}
