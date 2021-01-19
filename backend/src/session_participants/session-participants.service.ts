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
    EditPresenceRequest,
    DisjoinRequest,
    JoinRequest
} from "../api/requests/session-participant.dto";
import {Session} from "../sessions/session.entity";
import {SessionParticipant} from "./session-participant.entity";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"
import {JoinResponse, OrderPosition} from "../api/responses/session-paricipant.dto";
import * as server_config from "../config/server.json"

@Injectable()
export class SessionParticipantService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SESSION_PARTICIPANTS_REPOSITORY) private sessionParticipantsRepository: typeof SessionParticipant,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async join(request: JoinRequest): Promise<JoinResponse> {

        let response = new JoinResponse();
        response.firstname = AuthorizedUser.getFirstname();
        response.lastname = AuthorizedUser.getLastname();
        response.email = AuthorizedUser.getEmail();

        response.amount = 0;
        response.positions = [];

        for (const position of request.positions) {

            const session = await this.sessionsRepository.findByPk(position.session_id);
            const profile = await this.profilesRepository.findByPk(position.profile_id);

            notfound(session);
            notfound(profile);
            AuthorizedUser.checkOwnership(profile.user_id);

            await this.checkIfAlreadyJoined(session.id, profile.id);

            let resPosition = new OrderPosition()
            resPosition.session_id = session.id;
            resPosition.profile_id = profile.id;

            resPosition.firstname = profile.firstname;
            resPosition.lastname = profile.firstname;

            resPosition.start_date = session.start_date;
            resPosition.end_date = session.end_date;

            resPosition.amount = server_config.session.price;
            response.amount += resPosition.amount;

            response.positions.push(resPosition);
        }

        return response;
    }

    // async join(request: JoinRequest): Promise<JoinResponse> {
    //     const session = await this.getSession(request.session_id);
    //     const profiles = await this.getProfiles(request.profiles_ids, AuthorizedUser.getId());
    //
    //     notfound(session);
    //
    //     const t = await this.sequelize.transaction();
    //
    //     try {
    //         for (const profile of profiles) {
    //
    //             const sp = await this.sessionParticipantsRepository.findAndCountAll({
    //                 where: {
    //                     profile_id: profile.id,
    //                     session_id: session.id
    //                 }
    //             });
    //             if (sp.count > 0) {
    //                 throw new UnprocessableEntityException("Already joined");
    //             }
    //
    //             await this.sessionParticipantsRepository.create({
    //                 session_id: session.id,
    //                 profile_id: profile.id
    //             }, {transaction: t})
    //         }
    //
    //         await t.commit()
    //     } catch (err) {
    //         await t.rollback();
    //         throw err;
    //     }
    // }

    public async disjoin(request: DisjoinRequest) {

        const sp = await this.sessionsRepository.findByPk(request.session_id);
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

    public async edit_presence(request: EditPresenceRequest): Promise<boolean> {
        const sp = await this.sessionParticipantsRepository.findByPk(request.id);
        notfound(sp)
        AuthorizedUser.checkIsOrganizer();
        sp.present = request.present;
        sp.update(request);
        await sp.save();
        return request.present;
    }

    protected async checkIfAlreadyJoined(sessionId: number, profileId: number): Promise<void> {
        const sp = await this.sessionParticipantsRepository.findAndCountAll({
            where: {
                session_id: sessionId,
                profile_id: profileId,
            }
        });
        if (sp.count > 0) {
            throw new UnprocessableEntityException("Already joined");
        }
    }
}
