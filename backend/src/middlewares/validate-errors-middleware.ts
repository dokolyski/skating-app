import {ValidatorError} from 'typescript-class-validator';
import {Request, Response} from "express";
import HttpCode from 'http-status-codes'

export function ValidateRequestMiddleware() {
    return (error, req: Request, res: Response, next) => {
        if (error instanceof ValidatorError) {
            res.status(HttpCode.UNPROCESSABLE_ENTITY).json(mapErrors(error));
        }
    }
}

function mapErrors(error: ValidatorError) {
    return error.validationErrors.map( e => {
        return {
            name: e.property,
            errors: e.constraints
        }
    });
}
