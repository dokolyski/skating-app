import {Inject, Injectable} from '@nestjs/common';
import {CONFIG_REPOSITORY} from "../constants";
import {Config} from "./config.entity";
import {notfound} from "../helpers/helpers";
import AuthorizedUser from "../helpers/authorized-user"
import {ConfigEditRequest, ConfigRequest} from "../api/requests/config.dto";
import {ConfigResponse} from "../api/responses/config.dto";

@Injectable()
export class ConfigService {
    constructor(@Inject(CONFIG_REPOSITORY) private configRepository: typeof Config
    ) {
    }

    public async index(): Promise<ConfigResponse[]> {

        AuthorizedUser.checkIsAdmin();

        return this.configRepository.findAll();
    }

    public async get(id: number): Promise<ConfigResponse> {

        AuthorizedUser.checkIsAdmin();
        const config = await this.configRepository.findByPk(id);
        notfound(config);

        return config;
    }

    public async create(request: ConfigRequest): Promise<void> {

        AuthorizedUser.checkIsAdmin();

        await this.configRepository.create(request);
    }

    public async edit(id: number, request: ConfigEditRequest): Promise<void> {
        AuthorizedUser.checkIsAdmin();

        const config = await this.configRepository.findByPk(id);
        notfound(config);

        config.update(request);
        await config.save();
    }

    public async delete(id: number): Promise<void> {
        AuthorizedUser.checkIsAdmin();

        const config = await this.configRepository.findByPk(id);
        notfound(config);

        await config.destroy();
    }
}
