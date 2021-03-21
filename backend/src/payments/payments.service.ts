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
import {
    P24,
    Order,
    Currency,
    Country,
    Language,
    NotificationRequest,
    Verification, Encoding
} from "@ingameltd/node-przelewy24";
import {Md5} from 'ts-md5/dist/md5';
import {Transaction} from "sequelize";
import * as client_config from '../config/client.json'
import assert from 'assert';

@Injectable()
export class PaymentsService {
    private p24: P24;

    constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User,
                @Inject(SESSION_REPOSITORY) private sessionsRepository: typeof Session,
                @Inject(SESSION_PARTICIPANTS_REPOSITORY) private participantRepository: typeof SessionParticipant,
                @Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile,
                @Inject(PAYMENTS_REPOSITORY) private paymentsRepository: typeof Payment,
                @Inject(SEQUELIZE) private readonly sequelize: Sequelize
    ) {
        this.p24 = this.preparePaymentClient();
    }

    async create(request: JoinRequest): Promise<PaymentResponse> {

        await this.validatePositions(request.positions);

        let t = await this.sequelize.transaction();

        await this.p24.testAccess();

        try {
            const payment = await this.registerPayment(request.type, await this.calculateAmount(request.positions), t);

            await this.createParticipants(payment, request.positions, t);
            await t.commit();

            const response = new PaymentResponse()
            response.orderId = payment.order_id;
            response.paymentLink = payment.link;
            return response;
        } catch (err) {
            t.rollback();
            throw err;
        }
    }

    async get(id: number): Promise<PaymentResponse> {

        const payment: Payment = await this.paymentsRepository.findOne({
            where: {
                order_id: id
            }
        });

        notfound(payment);

        return {
            paymentLink: payment.link,
            session_id: payment.session_id,
            currency: payment.currency,
            sign: payment.sign,
            orderId: payment.order_id,
            amount: payment.amount,
            status: payment.status
        };
    }

    async verify(request: any): Promise<void> {
        await this.p24.testAccess();

        const verify: NotificationRequest = request.body
        assert(this.p24.verifyNotification(verify), 'Wrong p24 notification received')

        const verifyRequest: Verification = {
            amount: verify.amount,
            currency: Currency.PLN,
            orderId: verify.orderId,
            sessionId: verify.sessionId
        }

        const res = await this.p24.verifyTransaction(verifyRequest)
        if (res === true) {
            const payment: Payment = await this.paymentsRepository.findOne({
                where: {
                    hash: request.p24_order_id
                }
            });

            notfound(payment);

            payment.session_id = request.p24_session_id;
            payment.currency = request.p24_currency;
            payment.sign = request.p24_sign;
            payment.order_id = request.p24_order_id;
            payment.amount = request.p24_amount;
            payment.status = "PAID";
        }



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
            const session = await this.sessionsRepository.findByPk(position.session_id)
            amount += session.price * 100;
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

    protected preparePaymentClient(): P24 {
        const c = server_config.payments.client;
        return new P24(c.merchantId, c.posId, c.apiKey, c.crcKey, c.mode);
    }

    protected preparePaymentParams(user: User, payment: Payment): Order {
        return {
            timeLimit: server_config.payments.timeLimit,
            amount: payment.amount,
            country: Country.Poland,
            currency: Currency.PLN,
            language: Language.PL,
            description: server_config.payments.description, // set description
            email: user.email,
            sessionId: Md5.hashStr((new Date().toTimeString())).toString(),
            urlReturn: this.prepareReturnUrl(payment.hash),
            urlStatus: this.prepareStatusUrl(),
            encoding: Encoding.UTF8
        }
    }

    protected prepareReturnUrl(order: string): string {
        return client_config.domain + ":" + client_config.port + "/order_complete?order=" + order;
    }

    protected prepareStatusUrl(): string {
        return server_config.domain + ":" + server_config.port + "/api/payments/verify";
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

    public async registerPayment(paymentMethod: string, amount: number, t: Transaction): Promise<Payment> {
        const user = AuthorizedUser.getUser();

        let payment: Payment = await this.paymentsRepository.create({
            email: AuthorizedUser.getEmail(),
            type: paymentMethod,
            amount,
        }, {transaction: t});

        payment.hash = Md5.hashStr(payment.id.toString()).toString();
        payment.link = (await this.p24.createTransaction(this.preparePaymentParams(user, payment))).link;

        await payment.save({transaction: t});
        return payment
    }
}
