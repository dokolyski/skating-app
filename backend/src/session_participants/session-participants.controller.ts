import {Body, Controller, Delete, Post} from '@nestjs/common';
import {SessionParticipantService} from "./session-participants.service";
import {JoinRequest, DisjoinRequest} from "../api/requests/session-participant.dto";
import {JoinResponse} from "../api/responses/session-paricipant.dto";

@Controller('session-participants')
export class SessionParticipantsController {
    constructor(private service: SessionParticipantService) {

    }

    @Post()
    async join(@Body() request: JoinRequest): Promise<JoinResponse> {
        return await this.service.join(request);
    }

    @Delete()
    async disjoin(@Body() request: DisjoinRequest) {
        await this.service.disjoin(request);
    }
}
