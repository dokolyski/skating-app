import HttpCode from 'http-status-codes'
import LogicError from "./logic-error";

export default class NotFoundException extends LogicError {

    status: number;

    constructor(message: string = 'Not found', status: number = HttpCode.NOT_FOUND) {
        super(message);
        this.status = status;
    }
}