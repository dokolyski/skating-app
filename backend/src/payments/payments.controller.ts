import {Body, Controller, Post, Res} from '@nestjs/common';
import {PaymentsService} from "./payments.service";
import {JoinRequest} from "../api/requests/session-participant.dto";
import {PaymentVerifyRequest} from "../api/requests/payment.dto";
import {Response} from 'express'
import * as client_config from '../config/client.json'

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {
    }

    @Post()
    async create(@Body() request: JoinRequest, @Res({passthrough: true}) res: Response) {

        try {
            const response = await this.paymentsService.create(request);

            res.redirect(client_config.domain + ":" + client_config.port + "/order_complete?order=" + response.orderId);
        } catch (e) {
            res.redirect(client_config.domain + ":" + client_config.port + "/error?error=payment");
        }
    }

    @Post('/verify')
    async verify(@Body() request: PaymentVerifyRequest): Promise<void> {
        return await this.paymentsService.verify(request);
    }
}
