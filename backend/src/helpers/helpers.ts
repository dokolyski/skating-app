import {
    BadRequestException,
    InternalServerErrorException,
    UnprocessableEntityException
} from "@nestjs/common";

export function serverError(object): void {
    if (object === null)
        throw new InternalServerErrorException()
}

export function notfound(object): void {
    if (object === null)
        throw new UnprocessableEntityException()
}

export function toNumber(value: string): number {
    const v = parseInt(value);
    if (isNaN(v))
        throw new BadRequestException()
    return v
}