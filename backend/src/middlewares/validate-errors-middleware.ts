import {ValidatorError} from 'typescript-class-validator';
import {Request, Response} from "express";
import HttpCode from 'http-status-codes'
import sequelize from "sequelize";
import LogicError from "../misc/logic-error";

export function ValidateRequestMiddleware() {
    return (error, req: Request, res: Response, next) => {
        if (error instanceof ValidatorError) {
            res.status(HttpCode.UNPROCESSABLE_ENTITY).json(mapErrors(error));
        } else if (error instanceof sequelize.ValidationError) {
            res.status(HttpCode.UNPROCESSABLE_ENTITY).json(mapSequelizeErrors(error));
        } else if (error instanceof LogicError) {
            res.status(error.status).json({
                error: error.message
            });
        } else {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                error: error.message
            });
        }
    }
}

function mapErrors(error: ValidatorError) {
    return error.validationErrors.map(e => {
        return {
            name: e.property,
            errors: e.constraints
        }
    });
}

function mapSequelizeErrors(error: sequelize.ValidationError) {
    return error.errors.map(e => {
        return {
            name: e.path,
            errors: e.message
        }
    });
}
