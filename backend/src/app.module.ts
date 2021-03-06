import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {SessionsController} from './sessions/sessions.controller';
import {SessionsService} from './sessions/sessions.service';
import {sessionsProviders} from './sessions/sessions.providers';
import {databaseProviders} from './database.providers';
import {usersProviders} from "./users/users.providers";
import {profilesProviders} from "./profiles/profiles.providers";
import {notificationsProviders} from "./notifications/notifications.providers";
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {ProfilesController} from './profiles/profiles.controller';
import {ProfilesService} from './profiles/profiles.service';
import {NotificationsController} from './notifications/notifications.controller';
import {NotificationsService} from './notifications/notifications.service';
import {VerificationService} from './verification/verification.service';
import {VerificationController} from './verification/verification.controller';
import {TokenMiddleware} from "./middlewares/token-middleware";
import {SessionParticipantsController} from "./session_participants/session-participants.controller";
import {SessionParticipantService} from "./session_participants/session-participants.service";
import {sessionParticipantProviders} from "./session_participants/session-participants.providers";
import {ConfigController} from "./config/config.controller";
import {ConfigService} from "./config/config.service";
import {configProviders} from "./config/config.providers";
import {PaymentsService} from "./payments/payments.service";
import {PaymentsController} from "./payments/payments.controller";
import {paymentsProviders} from "./payments/payments.providers";
import {GoogleStrategy} from "./strategies/google.strategy";

@Module({
    imports: [],
    controllers: [
        ConfigController,
        SessionsController,
        UsersController,
        ProfilesController,
        NotificationsController,
        VerificationController,
        SessionParticipantsController,
        PaymentsController
    ],
    providers: [
        ConfigService,
        SessionsService,
        UsersService,
        ProfilesService,
        NotificationsService,
        VerificationService,
        SessionParticipantService,
        PaymentsService,
        GoogleStrategy,
        ...databaseProviders,
        ...configProviders,
        ...sessionsProviders,
        ...usersProviders,
        ...profilesProviders,
        ...notificationsProviders,
        ...sessionParticipantProviders,
        ...sessionParticipantProviders,
        ...paymentsProviders
    ],
    exports: [...databaseProviders],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .exclude(
                {path: 'api/verification', method: RequestMethod.POST},
                {path: 'api/verification/google', method: RequestMethod.GET},
                {path: 'api/verification/google/redirect', method: RequestMethod.GET},
                {path: 'api/users', method: RequestMethod.POST},
                {path: 'api/sessions', method: RequestMethod.GET},
                {path: 'api/config/:key', method: RequestMethod.GET}
            )
            .forRoutes('*')
    }
}
