import {Injectable, NestMiddleware, Req, Res, UnauthorizedException} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken'
import server_config from '../config/server.json'
import {User} from "../users/user.entity";
import AuthorizedUser from "../helpers/authorized-user"
import {Profile} from "../profiles/profile.entity";

@Injectable()
export class TokenMiddleware implements NestMiddleware {

    async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {

        try {
            const token = req.cookies["secure-token"] as string
            if (!token) {
                throw new UnauthorizedException('No token provided.');
            }

            jwt.verify(token, server_config.token.secret, (err, decoded) => {
                if (err) {
                    throw new UnauthorizedException("Failed to authenticate token. " + err.message);
                }
            })

            const user = await User.findOne({
                where: {token: token}
            });

            if (user === null) {
                throw new UnauthorizedException('User not found');
            }

            const profile = await Profile.findOne({
                where: {
                    user_id: user.id,
                    is_owner: true
                }
            });

            AuthorizedUser.setUser(user);
            AuthorizedUser.setProfile(profile);
            next();
        } catch (e) {
            next(e)
        }
    }
}