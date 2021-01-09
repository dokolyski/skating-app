import {SessionRequest as Session} from 'api/rest-models/session-request'
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';

export class SessionParticipant {
  session: Session;
  participant: Profile;
}
