import {Validate, Validator} from "typescript-class-validator";
import {SESSIONS} from '../api/rest-types';
import Session from '../models/sessions'
import {notfound} from "../misc/helpers";
import AuthorizedUser from "../misc/authorized-user"

const {Op} = require("sequelize");

export default class Sessions {

    @Validate
    public static async index(@Validator dateRange: SESSIONS.INDEX.INPUT): Promise<SESSIONS.INDEX.OUTPUT> {

        const sessions = await Session.findAll({
            where: {
                start_date: {
                    [Op.between]: [dateRange.date_from, dateRange.date_to]
                }
            }
        });
        notfound(sessions);

        return sessions;
    }

    public static async get(sessionId: number): Promise<SESSIONS.GET.OUTPUT> {

        // TODO return participants
        const session = await Session.findByPk(sessionId);
        notfound(session);

        return session;
    }

    @Validate
    public static async create(@Validator data: SESSIONS.CREATE.INPUT): Promise<void> {

        AuthorizedUser.checkOwnership(data.owner_id);
        await Session.create(data);
    }

    @Validate
    public static async edit(sessionId: number, @Validator data: SESSIONS.EDIT.INPUT): Promise<void> {

        const session = await Session.findByPk(sessionId);
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        session.update(data);
        await session.save();
    }

    public static async delete(sessionId: number): Promise<void> {

        const session = await Session.findByPk(sessionId);
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        await session.destroy();
    }


    @Validate
    public static async editStatus(sessionId: number, @Validator data: SESSIONS.EDIT_STATUS.INPUT): Promise<void> {

        const session = await Session.findByPk(sessionId);
        notfound(session);
        AuthorizedUser.checkOwnership(session.owner_id);

        session.update(data);
        await session.save();
    }
}
