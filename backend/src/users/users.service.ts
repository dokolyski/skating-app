import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {CONFIG_REPOSITORY, PAYMENTS_REPOSITORY, PROFILE_REPOSITORY, SEQUELIZE, USER_REPOSITORY} from "../constants";
import {User} from "./user.entity";
import {Sequelize} from "sequelize-typescript";
import {Profile} from "../profiles/profile.entity";
import {UserAddPointsRequest, UserEditRequest, UserRequest} from "../api/requests/user.dto";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user";
import {UserResponse, UserResponseWithName} from "../api/responses/user.dto";
import {UserChmod} from 'src/api/requests/user-chmod';
import {Payment} from 'src/payments/payment.entity';
import {Md5} from 'ts-md5';
import {PaymentResponse} from 'src/api/responses/payment.dto';
import {Config} from 'src/config/config.entity';
import assert from 'assert';
import {PaymentsService} from 'src/payments/payments.service';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(PAYMENTS_REPOSITORY) private paymentsRepository: typeof Payment,
                @Inject(CONFIG_REPOSITORY) private configRepository: typeof Config,
                private paymentsService: PaymentsService,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async index(): Promise<UserResponseWithName[]> {
        AuthorizedUser.checkIsAdmin();
        const users = await User.findAll();
        return Promise.all(users.map(async value => {
            const mainProfile = await this.profilesRepository.findOne({
                where: {
                    user_id: value.id,
                    is_owner: true
                }
            })
            return {
                id: value.id,
                email: value.email,
                password: value.password,
                isOrganizer: value.isOrganizer,
                isAdmin: value.isAdmin,
                isHAdmin: value.isHAdmin,
                phone_number: value.phone_number,
                verified: value.verified,
                token: value.token,
                password_reset_token: value.password_reset_token,
                password_reset_token_expiration_date: value.password_reset_token_expiration_date,
                createdAt: value.createdAt,
                updatedAt: value.updatedAt,
                firstname: mainProfile.firstname,
                lastname: mainProfile.lastname,
                pointsAmount: value.pointsAmount
            }
        }));
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
            user.verified = true //TODO temporary

            await user.save({transaction: t});

            await user.$create('Profile', {
                firstname: userRequest.firstname,
                lastname: userRequest.lastname,
                birth_date: new Date(userRequest.birth_date),
                is_owner: true
            }, {transaction: t});

            // const href = `http://${server_config.ip}:${server_config.port}/user/register/verify?email=${user.email}&id=${user.id}`;

            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    async edit(id: number, request: UserEditRequest) {

        const user = await User.findByPk(AuthorizedUser.getId());
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

    async changePermissions(id: number, request: UserChmod) {
        AuthorizedUser.checkIsAdmin();
        const user = await User.findByPk(id);
        if (user.isHAdmin && request.admin != user.isAdmin) {
            throw new UnauthorizedException("errors.messages.ACCESS_FORBIDDEN")
        }
        user.update({isAdmin: request.admin, isOrganizer: request.organizer});
        await user.save();
    }

    async paymentForPoints(id: number, request: UserAddPointsRequest) {
        AuthorizedUser.checkOwnership(id);
        const pointsTableConfig: Config = await this.configRepository.findByPk('price_table')
        const pointsTable = JSON.parse(pointsTableConfig.value);

        const chosenPointsOption = (pointsTable as {required_money: number,
            points: number}[]).find(value => value.points === request.pointsAmount && value.required_money === request.price)

        assert(chosenPointsOption != null, 'Points_option_not_found')

        let t = await this.sequelize.transaction();

        try {
            const payment = await this.paymentsService.registerPayment('CASH', chosenPointsOption.required_money, t);
            const response = new PaymentResponse()
            response.orderId = payment.order_id;
            response.paymentLink = payment.link;
            return response;
        } catch (err) {
            t.rollback();
            throw err;
        }
    }
}
