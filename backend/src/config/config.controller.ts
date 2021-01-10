import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ConfigService} from "./config.service";
import {ConfigEditRequest, ConfigRequest} from "../api/requests/config.dto";
import {ConfigResponse} from "../api/responses/config.dto";

@Controller('config')
export class ConfigController {
    constructor(private configService: ConfigService) {
    }

    @Get()
    async index(): Promise<ConfigResponse[]> {
        return await this.configService.index();
    }


    @Get(':id')
    async get(@Param('id') id: number): Promise<ConfigResponse> {
        return await this.configService.get(id);
    }

    @Post()
    async create(@Body() request: ConfigRequest) {
        await this.configService.create(request);
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() request: ConfigEditRequest) {
        await this.configService.edit(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.configService.delete(id);
    }
}
