import {ProfileResponse} from 'api/responses/profile.dto';
import SessionResponse from 'api/responses/session.dto';

export class SessionParticipant {
  session: SessionResponse;
  participant: ProfileResponse;
}
