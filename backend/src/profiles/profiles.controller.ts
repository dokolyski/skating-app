import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProfilesService} from "../profiles/profiles.service";
import {ProfileEditRequest, ProfileRequest} from "../api/requests/profile.dto";
import {ProfileResponse} from "../api/responses/profile.dto";

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {
    }

    @Get()
    async index(): Promise<ProfileResponse[]> {
        return await this.profilesService.index();
    }


    @Get(':id')
    async get(@Param('id') id: number): Promise<ProfileResponse> {
        return await this.profilesService.get(id);
    }

    @Post()
    async create(@Body() request: ProfileRequest) {
        await this.profilesService.create(request);
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() request: ProfileEditRequest) {
        await this.profilesService.edit(id, request);
    }

    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     await this.profilesService.delete(id);
    // }
}
