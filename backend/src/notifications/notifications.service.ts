import {Inject, Injectable} from '@nestjs/common';
import {NOTIFICATION_REPOSITORY, SEQUELIZE, SESSION_REPOSITORY} from "../constants";
import {Notification} from "./notification.entity";
import {Session} from "../sessions/session.entity";
import {Sequelize} from "sequelize-typescript";
import {
    NotificationStatusRequest,
    NotificationIndexRequest,
    NotificationRequest
} from "../api/requests/notification.dto";
import {NotificationResponse} from "../api/responses/notification.dto";
import {notfound, serverError} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"
import {Profile} from "../profiles/profile.entity";
import {User} from "../users/user.entity";

@Injectable()
export class NotificationsService {
    constructor(@Inject(NOTIFICATION_REPOSITORY) private notificationsRepository: typeof Notification,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async index(request: NotificationIndexRequest): Promise<NotificationResponse[]> {
        const notifications = await this.notificationsRepository.findAll({
            where: {
                user_id: request.user_id
            }
        });
        notfound(notifications);


        return notifications.map(notification => {
                const owner = notification.owner.profiles.find(profile => profile.is_owner);

                serverError(owner);

                return {
                    ...notification,
                    owner: {
                        firstname: owner.firstname,
                        lastname: owner.lastname,
                        email: notification.owner.email
                    }
                }
            }
        )
    };

    async create(request: NotificationRequest) {
        const session = await this.sessionsRepository.findByPk(request.session_id, {
            include: [{
                model: Profile,
                include: [User]
            }]
        });
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        const t = await this.sequelize.transaction();

        try {
            for (let profile of session.profiles) {
                await profile.user.$create('Notification', request, {transaction: t});
            }

            t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    async status(id: number, request: NotificationStatusRequest): Promise<void> {

        const notification = await this.notificationsRepository.findByPk(id);
        notfound(notification);
        AuthorizedUser.checkOwnership(notification.session.owner_id);

        notification.update(request);
        await notification.save();
    }

    async delete(id: number) {

        const notification = await this.notificationsRepository.findByPk(id);
        notfound(notification);
        AuthorizedUser.checkOwnership(notification.session.owner_id);

        await notification.destroy();
    }
}
