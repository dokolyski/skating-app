import {Request, Response} from 'express'
import HttpCode from 'http-status-codes'
import * as jwt from 'jsonwebtoken'
import server_config from '../config/server.json'
import User from "../models/users";
import UnauthorizedException from "../misc/unauthorized-exception";

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

            if (user === null)
                throw new UnauthorizedException();

            req.user = user;
            next();
        } catch (e) {
            next(e)
        }
    }
}