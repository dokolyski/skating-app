import {Validate, Validator} from "typescript-class-validator";
import {SESSIONS} from '../api/rest-types';
import Session from '../models/sessions'
import NotFoundException from "../misc/not-found-exception";

const {Op} = require("sequelize");

export default class Sessions {

    public static async index(dateStart: Date, dateEnd: Date): Promise<Session[]> {

        const sessions = await Session.findAll({
            where: {
                start_date: {
                    [Op.between]: [dateStart, dateEnd]
                }
            }
        });
        if (sessions === null)
            throw new NotFoundException();

        return sessions;
    }

    public static async get(sessionId: number): Promise<Session> {

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
}
