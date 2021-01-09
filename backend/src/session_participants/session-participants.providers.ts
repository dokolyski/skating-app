import {SESSION_PARTICIPANTS_REPOSITORY} from "../constants";
import {SessionParticipant} from "./session-participant.entity";

export const sessionParticipantProviders = [
    {
        provide: SESSION_PARTICIPANTS_REPOSITORY,
        useValue: SessionParticipant,
    },
];