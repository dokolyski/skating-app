import {Validate, Validator} from "typescript-class-validator";
import {PROFILES} from '../api/rest-types';
import NotFoundException from "../misc/not-found-exception";
import Profile from "../models/profiles";

const {Op} = require("sequelize");

export default class Profiles {

    public static async index(userId: number): Promise<Profile[]> {

        const profiles = await Profile.findAll({
            where: {
                user_id: userId
            }
        });
        if (profiles === null)
            throw new NotFoundException();

        return profiles;
    }

    public static async get(profileId: number): Promise<Profile> {

        const profile = await Profile.findByPk(profileId);
        if (profile === null)
            throw new NotFoundException();

        return profile;
    }

    @Validate
    public static async create(@Validator data: PROFILES.CREATE.INPUT, userId: number): Promise<void> {

        data.user_id = userId;
        await Profile.create(data);
    }

    @Validate
    public static async edit(profileId: number, @Validator data: PROFILES.EDIT.INPUT): Promise<void> {

        const profile = await Profile.findByPk(profileId);
        if (profile === null)
            throw new NotFoundException();

        profile.update(data);
        await profile.save();
    }

    public static async delete(profileId: number): Promise<void> {

        const profile = await Profile.findByPk(profileId);
        if (profile === null)
            throw new NotFoundException();

        await profile.destroy();
    }
}
