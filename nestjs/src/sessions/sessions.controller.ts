import {Controller, Get, Inject} from '@nestjs/common';
import {SessionsService} from "./sessions.service";

@Controller('sessions')
export class SessionsController {
    constructor(private sessionService: SessionsService) {
    }

    @Get()
    async index() {
        return await this.sessionService.findAll();
    }
}
