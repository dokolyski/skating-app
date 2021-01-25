import {Body, Controller, Delete, Patch, Post} from '@nestjs/common';
import {SessionParticipantService} from "./session-participants.service";
import {JoinRequest, DisjoinRequest, EditPresenceRequest} from "../api/requests/session-participant.dto";
import {JoinResponse} from "../api/responses/session-paricipant.dto";

@Controller('session_participants')
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

    @Patch()
    async edit_presence(@Body() request: EditPresenceRequest): Promise<boolean> {
        return await this.service.edit_presence(request);
    }
}
