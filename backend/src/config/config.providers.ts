import {Config} from './config.entity';
import {CONFIG_REPOSITORY} from "../constants";

export const configProviders = [
    {
        provide: CONFIG_REPOSITORY,
        useValue: Config,
    },
];