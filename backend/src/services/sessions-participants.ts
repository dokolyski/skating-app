import {Validate, Validator} from "typescript-class-validator";
import Session from "../models/sessions";
import NotFoundException from "../misc/not-found-exception";
import {SESSION_PARTICIPANTS} from "../api/rest-types";
import Profile from "../models/profiles";
import SessionParticipant from "../models/session_participants";
import ForbiddenException from "../misc/forbidden-exception";
import db from "../static/database";

export default class SessionsParticipants {


    @Validate
    public static async join(@Validator data: SESSION_PARTICIPANTS.JOIN.INPUT, userId: number): Promise<void> {

        const session = await Session.findByPk(data.session_id);
        if (session === null)
            throw new NotFoundException()

        const profiles = await Profile.findAll({
            where: {
                id: data.profiles_ids,
                user_id: userId
            }
        })

        if (profiles.length != data.profiles_ids.length)
            throw new ForbiddenException();

        const t = await db.transaction();


        try {
            for (const profile of profiles) {
                await SessionParticipant.create({
                    session_id: session.id,
                    profile_id: profile.id
                })
            }

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }
}