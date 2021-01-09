import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {NotificationsService} from "./notifications.service";
import {NotificationIndexRequest, NotificationRequest} from "../api/requests/notification.dto";
import {NotificationResponse} from "../api/responses/notification.dto";

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationsService: NotificationsService) {
    }

    @Get()
    async index(@Body() request: NotificationIndexRequest): Promise<NotificationResponse[]> {
        return await this.notificationsService.index(request);
    }

    @Post()
    async create(@Body() request: NotificationRequest) {
        await this.notificationsService.create(request);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.notificationsService.delete(id);
    }
}
