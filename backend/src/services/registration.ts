import smtp_config from '../config/smtp.json'
import SMTP from '../static/smtp'
import {User, Profile} from '../models/models'
import server_config from '../config/server.json'
import db from '../static/database'
import {decrypt} from '../init/generate-keys'
import LogicError from '../misc/logic-error'
import {Validator, Validate} from "typescript-class-validator";
import {VERIFICATION} from "../api/rest-types";

export default class Registration {
    @Validate()
    public static async signUp(@Validator() data: VERIFICATION.REGISTER.INPUT): Promise<void> {
        const t = await db.transaction();

        try {
            let userData = data as unknown as User;

            // userData.password = decrypt(userData.password);
            userData.account_type = "USER";
            userData.birth_date = new Date(data.birth_date);

            const user = await User.create(userData, {transaction: t});

            let profile = Profile.build({
                firstname: data.firstname,
                lastname: data.lastname,
                birth_date: new Date(data.birth_date),
                is_owner: true,
                skill_level: "LOW",
                user_id: user.id
            });

            await profile.save({transaction: t});

            const href = `http://${server_config.ip}:${server_config.port}/user/register/verify?email=${user.email}&id=${user.id}`;

            // await SMTP.sendMail({
            //     from: smtp_config.from,
            //     to: body.email,
            //     subject: 'Finish registration',
            //     html: `<a href="${href}">Click to finish registration</a>`
            // })
            await t.commit()
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }
}

// export async function verify(body: API.USER.REGISTER.VERIFY.GET.INPUT): Promise<void | Error | LogicError> {
//     const t = await db.transaction()
//     try {
//         const data = await User.findOne({
//             where: {
//                 email: body.email,
//                 id: Number.parseInt(body.id)
//             }
//         })
//
//         if (!data) {
//             throw new LogicError("user not found")
//         } else if (data.verified) {
//             throw new LogicError("user has been registered before")
//         }
//
//         await data.update({ registered: true }, { transaction: t })
//         t.commit()
//     } catch (err) {
//         t.rollback()
//         console.error(err)
//         return err
//     }
// }