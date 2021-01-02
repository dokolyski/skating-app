import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SessionsController} from './sessions/sessions.controller';
import {SessionsService} from './sessions/sessions.service';
import {sessionsProviders} from './sessions/sessions.providers';
import {databaseProviders} from './database.providers';

@Module({
    imports: [],
    controllers: [AppController, SessionsController],
    providers: [
        AppService, SessionsService,
        ...databaseProviders,
        ...sessionsProviders
    ],
    exports: [...databaseProviders],
})
export class AppModule {
}
