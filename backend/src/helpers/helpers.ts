import {
    BadRequestException,
    InternalServerErrorException,
    UnprocessableEntityException
} from "@nestjs/common";

export function serverError(object): void {
    if (object === null)
        throw new InternalServerErrorException("SERVER_ERROR")
}

export function notfound(object): void {
    if (object === null)
        throw new UnprocessableEntityException("UNPROCESSABLE_ENTITY")
}