import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {SessionsService} from "./sessions.service";
import {SessionEditRequest, SessionRequest, SessionStatusRequest} from "../api/requests/session.dto";
import SessionResponse from "../api/responses/session.dto";

@Controller('sessions')
export class SessionsController {
    constructor(private sessionService: SessionsService) {
    }

    @Get()
    async get(@Query('date_from') date_from: string | null, @Query('date_to') date_to: string | null): Promise<SessionResponse[]>  {
        return await this.sessionService.getAllFromDateRange(JSON.parse(date_from), JSON.parse(date_to));
    }

    @Post()
    async create(@Body() request: SessionRequest) {
        return await this.sessionService.create(request);
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() request: SessionEditRequest) {
        return await this.sessionService.edit(id, request);
    }

    @Patch(':id/status')
    async status(@Param('id') id: number, @Body() request: SessionStatusRequest) {
        return await this.sessionService.status(id, request);
    }

    @Delete()
    async delete(@Param('id') id: number) {
        return await this.sessionService.delete(id);
    }
}
