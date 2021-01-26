import {Injectable, Inject} from '@nestjs/common';
import {Session} from './session.entity';
import {SEQUELIZE, SESSION_REPOSITORY} from '../constants'
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user";
import {SessionRequest, SessionStatusRequest} from "../api/requests/session.dto";
import SessionResponse from "../api/responses/session.dto";
import {Profile} from "../profiles/profile.entity";
import {User} from "../users/user.entity";
import {NotificationsService} from "../notifications/notifications.service";
import {Sequelize} from "sequelize-typescript";

const {Op} = require("sequelize");

@Injectable()
export class SessionsService {
    constructor(private notificationService: NotificationsService,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize) {
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
                birth_date: session.owner.birth_date,
                phone_number: session.owner.phone_number,
                isOrganizer: session.owner.isOrganizer,
                isAdmin: session.owner.isAdmin,
                isHAdmin: session.owner.isHAdmin
            },
            profiles: session.profiles.map(profile => ({
                id: profile.id,
                user_id: profile.user_id,
                firstname: profile.firstname,
                lastname: profile.lastname,
                present: false,
                birth_date: profile.birth_date
            }))
        }));
    }

    async getAllFromDateRange(date_from: Date | null, date_to: Date | null): Promise<SessionResponse[]> {
        let whereClause;
        if (date_to == null && date_from == null) {
            whereClause = null;
        } else if (date_from == null) {
            whereClause = {
                start_date: {
                    [Op.lte]: date_to
                }
            }
        } else if (date_to == null) {
            whereClause = {
                start_date: {
                    [Op.gte]: date_from
                }
            }
        } else {
            whereClause = {
                start_date: {
                    [Op.between]: [date_from, date_to]
                }
            }
        }

        const sessions = await this.sessionsRepository.findAll<Session>({
            include: [User, Profile], where: whereClause
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
                birth_date: session.owner.birth_date,
                phone_number: session.owner.phone_number,
                isOrganizer: session.owner.isOrganizer,
                isAdmin: session.owner.isAdmin,
                isHAdmin: session.owner.isHAdmin
            },
            profiles: session.profiles.map(profile => ({
                id: profile.id,
                user_id: profile.user_id,
                firstname: profile.firstname,
                lastname: profile.lastname,
                present: false,
                birth_date: profile.birth_date
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
        AuthorizedUser.checkIsOrganizer();

        session.update(request);
        await session.save();
    }

    async status(id: number, request: SessionStatusRequest) {
        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);
        AuthorizedUser.checkIsOrganizer();

        const t = await this.sequelize.transaction()

        session.update(request);

        try {
            await this.notificationService.createNotificationForSession({
                session_id: session.id,
                title: "Zmieniono status sesji",
                description: "Zmieniono status sesji",
                owner_id: AuthorizedUser.getId(),
                show_date: new Date(Date.now()),
                expiration_date: new Date(Date.now() + 60 * 60 * 24 * 2),
                status: "ENABLED"
            }, t);

            t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }

        await session.save();
    }

    async delete(id: number) {

        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);
        AuthorizedUser.checkIsOrganizer();

        await session.destroy();
    }
}