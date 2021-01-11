import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PaymentsService} from "./payments.service";
import {JoinRequest} from "../api/requests/session-participant.dto";
import {PaymentResponse} from "../api/responses/payment.dto";
import {PaymentVerifyRequest} from "../api/requests/payment.dto";

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {
    }

    @Post()
    async create(@Body() request: JoinRequest): Promise<PaymentResponse> {
        return await this.paymentsService.create(request);
    }

    @Post('/veryfi')
    async verify(@Body() request: PaymentVerifyRequest): Promise<void> {
        return await this.paymentsService.verify(request);
    }
}
