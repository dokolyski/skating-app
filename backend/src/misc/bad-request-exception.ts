import HttpCode from 'http-status-codes'
import LogicError from "./logic-error";

export default class BadRequestException extends LogicError {

    status: number;

    constructor(message: string = 'Bad request', status: number = HttpCode.BAD_REQUEST) {
        super(message);
        this.status = status;
    }
}