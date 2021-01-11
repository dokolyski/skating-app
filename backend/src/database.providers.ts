import {Sequelize} from 'sequelize-typescript';
import {Profile} from "./profiles/profile.entity";
import {User} from "./users/user.entity";
import {Session} from './sessions/session.entity';
import {Notification} from "./notifications/notification.entity";
import {SessionParticipant} from "./session_participants/session-participant.entity";
import {Config} from "./config/config.entity";
import {Payment} from "./payments/payment.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: 'database_test.sqlite'
            });

            sequelize.addModels([Config, User, Profile, Session, Notification, SessionParticipant, Payment]);

            await sequelize.sync({force: true});
            return sequelize;
        },
    },
];