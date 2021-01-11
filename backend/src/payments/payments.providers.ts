import {Payment} from "./payment.entity";
import {PAYMENTS_REPOSITORY} from "../constants";

export const paymentsProviders = [
    {
        provide: PAYMENTS_REPOSITORY,
        useValue: Payment,
    },
];