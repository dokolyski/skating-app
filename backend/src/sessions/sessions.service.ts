import {Injectable, Inject} from '@nestjs/common';
import {Session} from './session.entity';
import {SESSION_REPOSITORY} from '../constants'
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user";
import {SessionRequest, SessionStatusRequest} from "../api/requests/session.dto";
import SessionResponse from "../api/responses/session.dto";
import {Profile} from "../profiles/profile.entity";
import {User} from "../users/user.entity";

@Injectable()
export class SessionsService {
    constructor(@Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session) {
    }

    async index(): Promise<SessionResponse[]> {
        const sessions = await this.sessionsRepository.findAll<Session>({
            include: [User, Profile]
        });

        return sessions.map(session => ({
            id: session.id,
            name: session.name,
            start_date: session.start_date,
            end_date: session.end_date,
            max_participants: session.max_participants,
            difficulty: session.difficulty,
            price: session.price,
            description: session.description,
            status: session.status,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            owner: {
                id: session.owner.id,
                email: session.owner.email,
                account_type: session.owner.account_type,
                birth_date: session.owner.birth_date,
                phone_number: session.owner.phone_number
            },
            profiles: session.profiles.map(profile => ({
                id: profile.id,
                user_id: profile.user_id,
                is_owner: profile.is_owner,
                firstname: profile.firstname,
                lastname: profile.lastname,
                birth_date: profile.birth_date,
                skill_level: profile.skill_level,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt
            }))
        }));
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