import smtp_config from '../config/smtp.json'
import SMTP from '../static/smtp'
import User from '../models/users'
import Profile from "../models/profiles";
import {Validator, Validate} from "typescript-class-validator";
import {USERS} from "../api/rest-types";
import NotFoundException from "../misc/not-found-exception";

export default class Users {

    public static async get(userId: number): Promise<USERS.GET.OUTPUT> {

        const user = await User.findByPk(userId);
        if (user === null)
            throw new NotFoundException();

        const profile = await Profile.findOne({
            where: {
                user_id: user.id,
                is_owner: true
            }
        });
        if (profile === null)
            throw new NotFoundException();

        return {
            id: user.id,
            email: user.email,
            password: user.password,
            birth_date: user.birth_date,
            phone_number: user.phone_number,
            firstname: profile.firstname,
            lastname: profile.lastname
        };
    }

    @Validate()
    public static async edit(userId: number, @Validator() data: USERS.EDIT.INPUT): Promise<void> {

        const user = await User.findByPk(userId);
        if (user === null)
            throw new NotFoundException();

        user.update(data);
        await user.save();
    }

    public static async delete(userId: number): Promise<void> {

        const user = await User.findByPk(userId);
        if (user === null)
            throw new NotFoundException();

        await user.destroy();
    }

}

