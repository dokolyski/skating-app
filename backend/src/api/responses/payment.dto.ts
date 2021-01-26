export class PaymentResponse {
    orderId: number;
    paymentLink: string;
    session_id;
    currency;
    sign;
    amount;
    status: string;
}