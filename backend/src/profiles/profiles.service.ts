import {Inject, Injectable} from '@nestjs/common';
import {PROFILE_REPOSITORY, SEQUELIZE} from "../constants";
import {Profile} from "./profile.entity";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"
import {ProfileEditRequest, ProfileIndexRequest, ProfileRequest} from "../api/requests/profile.dto";
import {ProfileResponse} from "../api/responses/profile.dto";

@Injectable()
export class ProfilesService {
    constructor(@Inject(PROFILE_REPOSITORY) private profilesRepository: typeof Profile
    ) {
    }

    public async index(data: ProfileIndexRequest): Promise<ProfileResponse[]> {

        AuthorizedUser.checkOwnership(data.user_id);

        return this.profilesRepository.findAll({
            where: {
                user_id: data.user_id
            }
        });
    }

    public async get(id: number): Promise<ProfileResponse> {

        const profile = await this.profilesRepository.findByPk(id);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id)

        return profile;
    }

    public async create(request: ProfileRequest): Promise<void> {

        AuthorizedUser.checkOwnership(request.user_id);

        await this.profilesRepository.create(request);
    }

    public async edit(id: number, request: ProfileEditRequest): Promise<void> {

        const profile = await this.profilesRepository.findByPk(id);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id);

        profile.update(request);
        await profile.save();
    }

    public async delete(id: number): Promise<void> {

        const profile = await this.profilesRepository.findByPk(id);
        notfound(profile);
        AuthorizedUser.checkOwnership(profile.user_id);

        await profile.destroy();
    }
}
