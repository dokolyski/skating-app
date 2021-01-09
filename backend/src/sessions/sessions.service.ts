import {Injectable, Inject} from '@nestjs/common';
import {Session} from './session.entity';
import {SESSION_REPOSITORY} from '../constants'
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user";
import {SessionRequest, SessionStatusRequest} from "../api/requests/session.dto";

@Injectable()
export class SessionsService {
    constructor(@Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session) {
    }

    async findAll(): Promise<Session[]> {
        return this.sessionsRepository.findAll<Session>();
    }

    async create(request: SessionRequest) {

        const session = this.sessionsRepository.build(request);
        AuthorizedUser.checkOwnership(session.owner_id);

        await session.save();
    }

    async edit(id: number, request: SessionRequest) {

        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);
        AuthorizedUser.checkOwnership(session.id);

        session.update(request);
        await session.save();
    }

    async status(id: number, request: SessionStatusRequest) {
        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        session.update(request);
        await session.save();
    }

    async delete(id: number) {

        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);
        AuthorizedUser.checkOwnership(session.id);

        await session.destroy();
    }
}