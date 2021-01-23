import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {PROFILE_REPOSITORY, SEQUELIZE, USER_REPOSITORY} from "../constants";
import {User} from "../users/user.entity";
import {Profile} from "../profiles/profile.entity";
import {Sequelize} from "sequelize-typescript";
import crypto from "crypto";
import {LoginRequest} from "../api/requests/login.dto";
import {LoginResponse} from "../api/responses/login.dto";
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as server_config from '../config/server.json'
import AuthorizedUser from "../helpers/authorized-user"

@Injectable()
export class VerificationService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {

    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const user = await this.usersRepository.findOne({
            where: {email: request.email}
        });

        if (!user) {
            throw new BadRequestException("Invalid username or password");
        } else if (!bcrypt.compareSync(request.password, user.password)) {
            throw new BadRequestException("Invalid username or password");
        } else if (!user.verified) {
            throw new UnauthorizedException("User hasn't finished registration");
        }

        const token = jwt.sign({id: crypto.randomBytes(64).toString('hex')},
            server_config.token.secret, {expiresIn: server_config.token.expiresIn});

        user.token = token;
        await user.save();
        return { token, isAdmin: user.isAdmin, isHAdmin: user.isHAdmin, isOrganizer: user.isOrganizer, uid: user.id };
    }

    async logout() {
        let user = AuthorizedUser.getUser();
        user.token = null;
        await user.save();
    }
}
