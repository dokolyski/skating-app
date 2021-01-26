import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserRequest, UserEditRequest} from "../api/requests/user.dto";
import {UserResponse} from "../api/responses/user.dto";
import {UserChmod} from 'src/api/requests/user-chmod';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Get()
    async index(): Promise<UserResponse[]> {
        return await this.usersService.index();
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<UserResponse> {
        return await this.usersService.get(id);
    }

    @Post()
    async create(@Body() userRequest: UserRequest) {
        await this.usersService.create(userRequest);
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() userRequest: UserEditRequest) {
        await this.usersService.edit(id, userRequest);
    }

    @Patch(':id/chmod')
    async changePermissions(@Param('id') id: number, @Body() request: UserChmod) {
        await this.usersService.changePermissions(id, request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.usersService.delete(id);
    }
}
