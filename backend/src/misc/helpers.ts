import NotFoundException from "./not-found-exception";

export function notfound(object) {
    if( object === null )
        throw new NotFoundException()
}