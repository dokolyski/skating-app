import {Body, Controller, Post} from '@nestjs/common';
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

    @Post()
    async edit(@Body() userRequest: UserEditRequest) {
        await this.usersService.create(userRequest);
    }
}
