import {Validate, Validator} from "typescript-class-validator";
import {PROFILES} from '../api/rest-types';
import Profile from "../models/profiles";
import AuthorizedUser from "../misc/authorized-user"
import {notfound} from "../misc/helpers";

export default class Profiles {

    public static async index(userId: PROFILES.INDEX.INPUT): Promise<PROFILES.INDEX.OUTPUT> {

        AuthorizedUser.checkOwnership(userId);

        const profiles = await Profile.findAll({
            where: {
                user_id: userId
            }
        });

        return profiles as any as PROFILES.INDEX.OUTPUT;
    }

    public static async get(profileId: number): Promise<Profile> {

        const profile = await Profile.findByPk(profileId);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id)

        return profile;
    }

    @Validate
    public static async create(@Validator data: PROFILES.CREATE.INPUT): Promise<void> {

        AuthorizedUser.checkOwnership(data.user_id);

        await Profile.create(data);
    }

    @Validate
    public static async edit(profileId: number, @Validator data: PROFILES.EDIT.INPUT): Promise<void> {

        const profile = await Profile.findByPk(profileId);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id);

        profile.update(data);
        await profile.save();
    }

    public static async delete(profileId: number): Promise<void> {

        const profile = await Profile.findByPk(profileId);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id);

        await profile.destroy();
    }
}
