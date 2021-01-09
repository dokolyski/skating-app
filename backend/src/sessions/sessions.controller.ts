import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {SessionsService} from "./sessions.service";
import {SessionEditRequest, SessionRequest, SessionStatusRequest} from "../api/requests/session.dto";
import {Session} from "./session.entity";

@Controller('sessions')
export class SessionsController {
    constructor(private sessionService: SessionsService) {
    }

    @Get()
    async index(): Promise<Session[]>  {
        return await this.sessionService.findAll();
    }

    @Post()
    async create(@Body() request: SessionRequest) {
        return await this.sessionService.create(request);
    }

    @Put()
    async edit(@Param('id') id: number, @Body() request: SessionEditRequest) {
        return await this.sessionService.edit(id, request);
    }

    @Patch('status')
    async status(@Param('id') id: number, @Body() request: SessionStatusRequest) {
        return await this.sessionService.status(id, request);
    }

    @Delete
    ()
    async delete(@Param('id') id: number) {
        return await this.sessionService.delete(id);
    }
}
