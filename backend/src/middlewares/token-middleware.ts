import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import server_config from '../config/server.json'
import User from "../models/users";
import UnauthorizedException from "../misc/unauthorized-exception";
import AuthorizedUser from "../misc/authorized-user"
import {notfound} from "../misc/helpers";

export function TokenMiddleware() {
    return async (req: Request, res: Response, next) => {

        try {
            const token = req.cookies["secure-token"] as string
            if (!token) {
                throw new UnauthorizedException('No token provided.');
            }

            jwt.verify(token, server_config.token.secret, (err, decoded) => {
                if (err) {
                    throw new UnauthorizedException('Failed to authenticate token.');
                }
            })

            const user = await User.findOne({
                where: {token: token}
            });

            notfound(user);
            AuthorizedUser.setUser(user);
            next();
        } catch (e) {
            next(e)
        }
    }
}