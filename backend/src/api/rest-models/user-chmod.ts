import { IsBoolean, IsNotEmpty } from 'class-validator';

export const HEAD_ADMIN_GROUP = 'HA';

export class UserChmod {
    @IsNotEmpty()
    @IsBoolean()
    organizer: boolean;

    @IsNotEmpty({
        groups: [HEAD_ADMIN_GROUP]
    })
    @IsBoolean({
        groups: [HEAD_ADMIN_GROUP]
    })
    admin: boolean;
}
