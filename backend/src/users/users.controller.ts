import {Body, Controller, Delete, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserRequest, UserEditRequest} from "../api/requests/user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post()
    async create(@Body() userRequest: UserRequest) {
        await this.usersService.create(userRequest);
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() userRequest: UserEditRequest) {
        await this.usersService.edit(id, userRequest);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.usersService.delete(id);
    }
}
