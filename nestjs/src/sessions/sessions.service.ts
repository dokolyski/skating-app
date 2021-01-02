import {Injectable, Inject} from '@nestjs/common';
import {Session} from './session.entity';
import {SESSION_REPOSITORY} from '../constants'

@Injectable()
export class SessionsService {
    constructor(@Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session) {
    }

    async findAll(): Promise<Session[]> {
        return this.sessionsRepository.findAll<Session>();
    }
}