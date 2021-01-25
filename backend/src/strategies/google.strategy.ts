import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';
import * as server_config from '../config/server.json'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: server_config.providers.google.clientID,
            clientSecret: server_config.providers.google.clientSecret,
            callbackURL: server_config.domain + ':' + server_config.port + '/api/verification/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const {name, emails, photos} = profile
        const user = {
            email: emails[0].value,
            firstname: name.givenName,
            lastname: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}