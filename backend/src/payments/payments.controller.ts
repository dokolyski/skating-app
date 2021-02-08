import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {PaymentsService} from "./payments.service";
import {JoinRequest} from "../api/requests/session-participant.dto";
import {PaymentVerifyRequest} from "../api/requests/payment.dto";
import {PaymentResponse} from "../api/responses/payment.dto";
import {Response} from 'express'

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<PaymentResponse> {
        return await this.paymentsService.get(id);
    }

    @Post()
    async create(@Body() request: JoinRequest, @Res({passthrough: true}) res: Response) {
        return await this.paymentsService.create(request);
    }

    @Post('/verify')
    async verify(@Body() request: PaymentVerifyRequest): Promise<void> {
        return await this.paymentsService.verify(request);
    }
}
