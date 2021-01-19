import {IsNotEmpty, IsNumber, IsString, IsIn, ValidateNested, IsBoolean} from 'class-validator';
import {Type} from 'class-transformer';

export class JoinRequestPosition {
    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsNumber()
    profile_id: number;
}

export class JoinRequest {

    @ValidateNested({each: true})
    @Type(() => JoinRequestPosition)
    positions: JoinRequestPosition[]

    @IsNotEmpty()
    @IsString()
    @IsIn(['POINTS', 'CASH'])
    type: string;
}

export class DisjoinRequest {
    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_ids: number[];
}

export class EditPresenceRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsBoolean()
    present: boolean;
}


