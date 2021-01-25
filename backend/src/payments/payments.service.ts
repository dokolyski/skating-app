import {Inject, Injectable, UnprocessableEntityException} from '@nestjs/common';
import {
    PAYMENTS_REPOSITORY,
    PROFILE_REPOSITORY,
    SEQUELIZE,
    SESSION_PARTICIPANTS_REPOSITORY,
    SESSION_REPOSITORY,
    USER_REPOSITORY
} from "../constants";
import {Payment} from "./payment.entity";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"
import {JoinRequest, JoinRequestPosition} from "../api/requests/session-participant.dto";
import {PaymentResponse} from "../api/responses/payment.dto";
import * as server_config from "../config/server.json";
import {User} from "../users/user.entity";
import {Session} from "../sessions/session.entity";
import {SessionParticipant} from "../session_participants/session-participant.entity";
import {Profile} from "../profiles/profile.entity";
import {Sequelize} from "sequelize-typescript";
import {Country, Currency, Payment as P24Payment, Przelewy24} from "@ingameltd/node-przelewy24";
import {Md5} from 'ts-md5/dist/md5';
import {Transaction} from "sequelize";
import {PaymentVerifyRequest} from "../api/requests/payment.dto";

@Injectable()
export class PaymentsService {
    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SESSION_PARTICIPANTS_REPOSITORY) private participantRepository: typeof SessionParticipant,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(PAYMENTS_REPOSITORY) private paymentsRepository: typeof Payment,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
    }

    async create(request: JoinRequest): Promise<PaymentResponse> {

        this.validatePositions(request.positions);

        let t = await this.sequelize.transaction();

        const user = AuthorizedUser.getUser();

        const client = this.preparePaymentClient();
        await client.testConnection();

        try {
            let payment: Payment = await this.paymentsRepository.create({
                email: AuthorizedUser.getEmail(),
                type: request.type,
                amount: await this.calculateAmount(request.positions),
            }, {transaction: t});

            // payment.firstname = AuthorizedUser.getFirstname();
            // payment.lastname = AuthorizedUser.getLastname();

            payment.hash = Md5.hashStr(payment.id.toString()).toString();
            payment.link = await client.getPaymentLink(this.preparePaymentParams(user, payment));

            await payment.save({transaction: t});

            await this.createParticipants(payment, request.positions, t);
            await t.commit();

            const response = new PaymentResponse()
            response.paymentLink = payment.link;
            return response;
        } catch (err) {
            t.rollback();
            throw err;
        }
    }

    async verify(request: PaymentVerifyRequest): Promise<void> {

        const payment: Payment = await this.paymentsRepository.findOne({
            where: {
                hash: request.p24_order_id
            }
        });

        notfound(payment);

        payment.session_id = request.p24_session_id
        payment.currency = request.p24_currency
        payment.sign = request.p24_sign
        payment.order_id = request.p24_order_id
        payment.amount = request.p24_amount
    }

    protected async validatePositions(positions: JoinRequestPosition[]) {
        for (const position of positions) {

            const session = await this.sessionsRepository.findByPk(position.session_id);
            const profile = await this.profilesRepository.findByPk(position.profile_id);

            notfound(session);
            notfound(profile);
            AuthorizedUser.checkOwnership(profile.user_id);

            await this.checkIfAlreadyJoined(session.id, profile.id);
        }
    }

    protected async calculateAmount(positions: JoinRequestPosition[]): Promise<number> {
        let amount: number = 0;

        for (const position of positions) {

            await this.checkIfAlreadyJoined(position.session_id, position.profile_id);
            amount += server_config.session.price;
        }
        return amount;
    }

    protected async createParticipants(payment: Payment, positions: JoinRequestPosition[], t: Transaction): Promise<void> {

        for (const position of positions) {

            await this.participantRepository.create({
                session_id: position.session_id,
                profile_id: position.profile_id,
                payment_id: payment.id
            }, {transaction: t});
        }
    }

    protected preparePaymentClient(): Przelewy24 {
        const c = server_config.payments.client;
        return new Przelewy24(c.merchantId, c.posId, c.salt, c.testMode);
    }

    protected preparePaymentParams(user: User, payment: Payment): P24Payment {
        return new P24Payment({
            p24_amount: payment.amount,
            p24_country: Country.Poland,
            p24_currency: Currency.PLN,
            p24_description: server_config.payments.description, // set description
            p24_email: user.email,
            p24_session_id: Md5.hashStr((new Date().toTimeString())).toString(),
            p24_url_return: this.prepareReturnUrl(payment.hash),
            p24_url_status: this.prepareStatusUrl()
        })
    }

    protected prepareReturnUrl(order: string): string {
        return server_config.domain + "/payments/" + order;
    }

    protected prepareStatusUrl(): string {
        return server_config.domain + "/api/payments/status";
    }

    protected async checkIfAlreadyJoined(sessionId: number, profileId: number): Promise<void> {
        const sp = await this.participantRepository.findAndCountAll({
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
