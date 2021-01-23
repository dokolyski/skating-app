import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ConfigService} from "./config.service";
import {ConfigRequest} from "../api/requests/config.dto";
import {ConfigResponse} from "../api/responses/config.dto";

@Controller('config')
export class ConfigController {
    constructor(private configService: ConfigService) {
    }

    @Get()
    async index(): Promise<ConfigResponse[]> {
        return await this.configService.index();
    }


    @Get(':key')
    async get(@Param('key') key: string): Promise<ConfigResponse> {
        return await this.configService.get(key);
    }

    @Post()
    async create(@Body() request: ConfigRequest) {
        await this.configService.create(request);
    }

    @Delete(':id')
    async delete(@Param('key') key: string) {
        await this.configService.delete(key);
    }
}
