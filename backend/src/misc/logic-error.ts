import HttpCode from 'http-status-codes'

export default class LogicError extends Error {

    status: number;

    constructor(message: string, status: number = HttpCode.UNPROCESSABLE_ENTITY) {
        super(message);
        this.status = status;
    }
}