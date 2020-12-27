import HttpCode from 'http-status-codes'
import LogicError from "./logic-error";

export default class UnauthorizedException extends LogicError {

    status: number;

    constructor(message: string = 'Unauthorized', status: number = HttpCode.UNAUTHORIZED) {
        super(message);
        this.status = status;
    }
}