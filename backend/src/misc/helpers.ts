import NotFoundException from "./not-found-exception";
import BadRequestException from "./bad-request-exception";

export function notfound(object): void {
    if (object === null)
        throw new NotFoundException()
}

export function toNumber(value: string): number {
    const v = parseInt(value);
    if (isNaN(v))
        throw new BadRequestException()
    return v
}