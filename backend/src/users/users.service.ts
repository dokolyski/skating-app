import {Inject, Injectable} from '@nestjs/common';
import {PROFILE_REPOSITORY, SEQUELIZE, USER_REPOSITORY} from "../constants";
import {User} from "./user.entity";
import {Sequelize} from "sequelize-typescript";
import {Profile} from "../profiles/profile.entity";
import {UserEditRequest, UserRequest} from "../api/requests/user.dto";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user";
import {UserResponse} from "../api/responses/user.dto";

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async get(id: number): Promise<UserResponse> {
        const user = await User.findByPk(id);
        notfound(user);
        AuthorizedUser.checkOwnership(user.id);

        return user;
    }

    async create(userRequest: UserRequest) {
        const t = await this.sequelize.transaction();

        try {
            const user = this.usersRepository.build(userRequest);
            user.account_type = "USER";
            user.verified = true //TODO temporary

            await user.save({transaction: t});

            await user.$create('Profile', {
                firstname: userRequest.firstname,
                lastname: userRequest.lastname,
                birth_date: new Date(userRequest.birth_date),
                is_owner: true,
                skill_level: "LOW",
            }, {transaction: t});

            // const href = `http://${server_config.ip}:${server_config.port}/user/register/verify?email=${user.email}&id=${user.id}`;

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    async edit(id: number, request: UserEditRequest) {

        const user = await User.findByPk(id);
        notfound(user);
        AuthorizedUser.checkOwnership(user.id);

        user.update(request);
        await user.save();
    }

    async delete(id: number) {

        const user = await User.findByPk(id);
        notfound(user);
        AuthorizedUser.checkOwnership(user.id);

        await user.destroy();
    }


}
