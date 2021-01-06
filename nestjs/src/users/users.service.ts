import {Inject, Injectable} from '@nestjs/common';
import {PROFILE_REPOSITORY, SEQUELIZE, USER_REPOSITORY} from "../constants";
import {User} from "./user.entity";
import {Sequelize} from "sequelize-typescript";
import {Profile} from "../profiles/profile.entity";
import {UserRequest} from "../api/requests/user.dto";

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async create(userRequest: UserRequest) {
        const t = await this.sequelize.transaction();

        try {
            const user = this.usersRepository.build(userRequest);
            user.account_type = "USER";
            user.save({transaction: t});
            user.verified = true //TODO temporary

            await user.$create('Profile', {
                firstname: userRequest.firstname,
                lastname: userRequest.lastname,
                birth_date: new Date(userRequest.birth_date),
                is_owner: true,
                skill_level: "LOW",
                user_id: user.id
            });

            // const href = `http://${server_config.ip}:${server_config.port}/user/register/verify?email=${user.email}&id=${user.id}`;

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }
}
