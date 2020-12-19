import {Validate, Validator} from "typescript-class-validator";
import * as jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Bcrypt from 'bcrypt'
import smtp_config from 'config/smtp.json'
import SMTP from 'static/smtp'
import User from '../models/users'
import server_config from '../config/server.json'
import * as API from '../api/tokens'
import {decrypt} from '../init/generate-keys'
import LogicError from '../misc/logic-error'
import HttpCode from 'http-status-codes'

export default class Logging {
    @Validate
    public static async signIn(@Validator data: API.TOKEN.POST): Promise<{ token: string, expiresIn: number } | Error | LogicError> {
        data.password = decrypt(data.password);

        const user = await User.findOne({
            where: {email: data.email}
        });

        if (!user) {
            throw new LogicError("Invalid username or password", HttpCode.NOT_FOUND);
        } else if (!Bcrypt.compareSync(data.password, user.password)) {
            throw new LogicError("Invalid username or password");
        } else if (!user.verified) {
            throw new LogicError("User hasn't finished registration", HttpCode.UNAUTHORIZED);
        }

        const id = crypto.randomBytes(64).toString('hex');
        const token = jwt.sign({id: id}, server_config.token.secret, {expiresIn: server_config.token.expiresIn}); // 24 hours

        user.token = token;
        await user.save();

        return {token, expiresIn: server_config.token.expiresIn}
    }
}

// TODO uncomment
// export async function remindPassword(body: API.USER.LOGIN.GET.INPUT): Promise<void | Error | LogicError> {
//     const t = await db.transaction()
//
//     try {
//         let user = await User.findOne({ where: { email: body.email } })
//         if (!user) {
//             throw new LogicError("invalid email")
//         }
//
//         const token = crypto.randomBytes(64).toString('hex')
//         await user.update({ forgot_password_token: token }, { transaction: t })
//
//         await SMTP.sendMail({
//             from: smtp_config.from,
//             to: body.email,
//             subject: "Create new password",
//             html: `
//                 <form action="http://${server_config.ip}:${server_config.port}/user/login/reset" method="post">
//                     <input type="hidden" value="${token}" name="token">
//                     <input type="hidden" value="${body.email}" name="email">
//                     <div>
//                     	<label for="password">Password</label>
//                     	<input required type="password" id="password" name="password">
//                     </div>
//                     <div>
//                     	<input type="submit" value="Submit">
//                     </div>
//                 </form>
//             `
//         })
//         await t.commit()
//     } catch (err) {
//         await t.rollback()
//         console.error(err)
//         return err
//     }
// }

// TODO uncomment
// export async function changePassword(body: API.USER.LOGIN.RESET.POST.INPUT): Promise<void | Error | LogicError> {
//     const t = await db.transaction()
//     try {
//         const user = await User.findOne({ where: { email: body.email } })
//         if (!user.password_reset_token) {
//             throw new LogicError("user hasn't requested a password change")
//         } else if (body.password.length < 8 || body.password.length > 16) {
//             throw new LogicError('password must be between 8 and 16 characters')
//         } else if(body.token !== user.password_reset_token) {
//             throw new LogicError('invalid reset token')
//         }
//
//         const hash = Bcrypt.hashSync(body.password, server_config.saltRounds)
//         await user.update({ password: hash, forgot_password_token: null }, { transaction: t })
//
//         t.commit()
//     } catch (err) {
//         t.rollback()
//         console.error(err)
//         return err
//     }
// }
