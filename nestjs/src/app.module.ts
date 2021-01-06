import {Module} from '@nestjs/common';
import {SessionsController} from './sessions/sessions.controller';
import {SessionsService} from './sessions/sessions.service';
import {sessionsProviders} from './sessions/sessions.providers';
import {databaseProviders} from './database.providers';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {ProfilesController} from './profiles/profiles.controller';
import {ProfilesService} from './profiles/profiles.service';
import {NotificationsController} from './notifications/notifications.controller';
import {NotificationsService} from './notifications/notifications.service';
import {usersProviders} from "./users/users.providers";
import {profilesProviders} from "./profiles/profiles.providers";
import {notificationsProviders} from "./notifications/notifications.providers";
import { VeryficationService } from './veryfication/veryfication.service';
import { VeryficationController } from './veryfication/veryfication.controller';

@Module({
    imports: [],
    controllers: [SessionsController, UsersController, ProfilesController, NotificationsController, VeryficationController],
    providers: [
        SessionsService,
        UsersService,
        ProfilesService,
        NotificationsService,
        ...databaseProviders,
        ...sessionsProviders,
        ...usersProviders,
        ...profilesProviders,
        ...notificationsProviders,
        VeryficationService
    ],
    exports: [...databaseProviders],
})
export class AppModule {
}
