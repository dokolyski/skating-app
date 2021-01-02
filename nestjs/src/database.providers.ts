import { Sequelize } from 'sequelize-typescript';
import { Session } from './sessions/session.entity';
import path from 'path';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: 'database_test.sqlite'
            });
            sequelize.addModels([Session]);
            await sequelize.sync();
            return sequelize;
        },
    },
];