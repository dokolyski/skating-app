import {Sequelize} from 'sequelize-typescript';
import {Profile} from "./profiles/profile.entity";
import {User} from "./users/user.entity";
import {Session} from './sessions/session.entity';
import {Notification} from "./notifications/notification.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: 'database_test.sqlite'
            });

            sequelize.addModels([User, Profile, Session, Notification]);

            await sequelize.sync({force: true});
            return sequelize;
        },
    },
];