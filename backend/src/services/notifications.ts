import {Validate, Validator} from "typescript-class-validator";
import {NOTIFICATIONS} from '../api/rest-types';
import Notification from '../models/notifications'
import {notfound} from "../misc/helpers";
import AuthorizedUser from "../misc/authorized-user"
import {Session} from "../models/models"

export default class Notifications {

    @Validate
    public static async index(@Validator data: NOTIFICATIONS.INDEX.INPUT): Promise<NOTIFICATIONS.INDEX.OUTPUT> {

        const notifications = await Notification.findAll({
            where: {
                user_id: data.user_id
            }
        });
        notfound(notifications);

        return notifications;
    }

    @Validate
    public static async create(@Validator data: NOTIFICATIONS.CREATE.INPUT): Promise<void> {

        const session = await Session.findByPk(data.session_id);
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        for (let user of session.getProfiles()) {
            user.createNotification(data);
        }

        await Notification.create(data);
    }

    public static async delete(notificationId: number): Promise<void> {

        const notification = await Notification.findByPk(notificationId);
        notfound(notification);
        AuthorizedUser.checkOwnership(notification.user_id);

        await notification.destroy();
    }


    @Validate
    public static async editStatus(notificationId: number, @Validator data: NOTIFICATIONS.EDIT_STATUS.INPUT): Promise<void> {

        const notification = await Notification.findByPk(notificationId);
        notfound(notification);
        AuthorizedUser.checkOwnership(notification.getSession().owner_id);

        notification.update(data);
        await notification.save();
    }
}
