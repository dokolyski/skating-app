import {IsNotEmpty, IsNumber, IsString, IsIn, ValidateNested} from 'class-validator';
import {Type} from "class-transformer";

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
    format: string;
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

