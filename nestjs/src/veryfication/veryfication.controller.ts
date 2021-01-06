import {Body, Controller, Post} from '@nestjs/common';
import {VeryficationService} from "./veryfication.service";
import {LoginRequest} from "../api/requests/login.dto";

@Controller('veryfication')
export class VeryficationController {
    constructor(private veryficationService: VeryficationService) {

    }


    @Post()
    async login(@Body() loginRequest: LoginRequest) {
        await this.veryficationService.login(loginRequest);
    }

}
