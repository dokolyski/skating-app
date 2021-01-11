import {TransactionVerification} from "@ingameltd/node-przelewy24";

export class PaymentVerifyRequest implements TransactionVerification {
    p24_amount: number;
    p24_currency: string;
    p24_order_id: number;
    p24_session_id: string;
    p24_sign: string;
}