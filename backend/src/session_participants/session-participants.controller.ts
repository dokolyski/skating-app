import {Body, Controller, Delete, Post} from '@nestjs/common';
import {SessionParticipantService} from "./session-participants.service";
import {SessionParticipantJoinRequest, SessionParticipantDisjoinRequest} from "../api/requests/session-participant.dto";

@Controller('session-participants')
export class SessionParticipantsController {
    constructor(private service: SessionParticipantService) {

    }

    @Post()
    async join(@Body() request: SessionParticipantJoinRequest) {
        await this.service.join(request);
    }

    @Delete()
    async disjoin(@Body() request: SessionParticipantDisjoinRequest) {
        await this.service.disjoin(request);
    }
}
