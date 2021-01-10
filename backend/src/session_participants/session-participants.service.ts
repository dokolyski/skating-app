import {
    Inject,
    Injectable, UnprocessableEntityException,
} from '@nestjs/common';
import {
    PROFILE_REPOSITORY,
    SEQUELIZE,
    SESSION_PARTICIPANTS_REPOSITORY,
    SESSION_REPOSITORY,
    USER_REPOSITORY
} from "../constants";
import {User} from "../users/user.entity";
import {Profile} from "../profiles/profile.entity";
import {Sequelize} from "sequelize-typescript";
import {
    SessionParticipantDisjoinRequest,
    SessionParticipantJoinRequest
} from "../api/requests/session-participant.dto";
import {Session} from "../sessions/session.entity";
import {SessionParticipant} from "./session-participant.entity";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"

@Injectable()
export class SessionParticipantService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SESSION_PARTICIPANTS_REPOSITORY) private sessionParticipantsRepository: typeof SessionParticipant,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async join(request: SessionParticipantJoinRequest) {
        const session = await this.getSession(request.session_id);
        const profiles = await this.getProfiles(request.profiles_ids, AuthorizedUser.getId());

        notfound(session);

        const t = await this.sequelize.transaction();

        try {
            for (const profile of profiles) {

                const sp = await this.sessionParticipantsRepository.findAndCountAll({
                    where: {
                        profile_id: profile.id,
                        session_id: session.id
                    }
                });
                if (sp.count > 0) {
                    throw new UnprocessableEntityException("Already joined");
                }

                await this.sessionParticipantsRepository.create({
                    session_id: session.id,
                    profile_id: profile.id
                }, {transaction: t})
            }

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    public async disjoin(request: SessionParticipantDisjoinRequest) {

        const sp = await this.getSession(request.session_id);
        notfound(sp)

        const t = await this.sequelize.transaction();

        try {
            const participants: SessionParticipant[] = await this.sessionParticipantsRepository.findAll(
                {
                    include: [Profile],
                    where: {
                        session_id: request.session_id,
                        profile_id: request.profiles_ids
                    }
                }
            )

            for (let participant of participants) {
                AuthorizedUser.checkOwnership(participant.profile.user_id);
                await participant.destroy({transaction: t});
                //TODO zwrot punktów na konto
            }

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }

    }


    private async getSession(id: number): Promise<Session> {
        const session = await this.sessionsRepository.findByPk(id);
        notfound(session);

        return session;
    }

    private async getProfiles(profilesIds: number[], userId: number): Promise<Profile[]> {
        const profiles = await this.profilesRepository.findAll({
            where: {
                id: profilesIds,
                user_id: userId
            }
        })

        if (profiles.length != profilesIds.length)
            throw new UnprocessableEntityException();

        return profiles
    }
}
