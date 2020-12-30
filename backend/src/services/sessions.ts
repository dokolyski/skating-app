import {Validate, Validator} from "typescript-class-validator";
import {SESSIONS} from '../api/rest-types';
import Session from '../models/sessions'
import NotFoundException from "../misc/not-found-exception";

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
        if (sessions === null)
            throw new NotFoundException();

        return sessions;
    }

    public static async get(sessionId: number): Promise<SESSIONS.GET.OUTPUT> {

        // TODO return participants
        const session = await Session.findByPk(sessionId);
        if (session === null)
            throw new NotFoundException();

        return session;
    }

    @Validate
    public static async create(@Validator data: SESSIONS.CREATE.INPUT, ownerId: number): Promise<void> {

        data.owner_id = ownerId;
        await Session.create(data);
    }

    @Validate
    public static async edit(sessionId: number, @Validator data: SESSIONS.EDIT.INPUT): Promise<void> {

        const session = await Session.findByPk(sessionId);
        if (session === null)
            throw new NotFoundException();

        session.update(data);
        await session.save();
    }

    public static async delete(sessionId: number): Promise<void> {

        const session = await Session.findByPk(sessionId);
        if (session === null)
            throw new NotFoundException();

        await session.destroy();
    }


    @Validate
    public static async editStatus(sessionId: number, @Validator data: SESSIONS.EDIT_STATUS.INPUT): Promise<void> {

        const session = await Session.findByPk(sessionId);
        if (session === null)
            throw new NotFoundException();

        session.update(data);
        await session.save();
    }
}
