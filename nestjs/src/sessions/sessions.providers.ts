import {Session} from './session.entity';
import {SESSION_REPOSITORY} from "../constants";

export const sessionsProviders = [
    {
        provide: SESSION_REPOSITORY,
        useValue: Session,
    },
];