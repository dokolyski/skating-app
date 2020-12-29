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
        const session = await this.getSession(data.session_id);
        const profiles = await this.getProfiles(data.profiles_ids, userId);

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

    public static async disjoin(id: number, authorizedUserId: number): Promise<void> {

        const sp = await SessionParticipant.findByPk(id);
        if (sp === null)
            throw new NotFoundException()

        const profile = await Profile.findByPk(sp.profile_id);
        if (profile.user_id !== authorizedUserId)
            throw new ForbiddenException();

        sp.destroy();
    }

    private static async getSession(sessionId: number): Promise<Session> {
        const session = await Session.findByPk(sessionId);
        if (session === null)
            throw new NotFoundException()

        return session;
    }

    private static async getProfiles(profilesIds: number[], userId: number): Promise<Profile[]> {
        const profiles = await Profile.findAll({
            where: {
                id: profilesIds,
                user_id: userId
            }
        })

        if (profiles.length != profilesIds.length)
            throw new ForbiddenException();

        return profiles
    }
}