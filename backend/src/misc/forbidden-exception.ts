import HttpCode from 'http-status-codes'
import LogicError from "./logic-error";

export default class ForbiddenException extends LogicError {

    status: number;

    constructor(message: string = 'Forbidden', status: number = HttpCode.FORBIDDEN) {
        super(message);
        this.status = status;
    }
}