import {IsNotEmpty, IsNumber, IsString, IsIn, ValidateNested, IsBoolean} from 'class-validator';
import {Type} from 'class-transformer';

export class JoinRequestPosition {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    session_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    profile_id: number;
}

export class JoinRequest {

    @ValidateNested({each: true})
    @Type(() => JoinRequestPosition)
    positions: JoinRequestPosition[]

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['POINTS', 'CASH'])
    type: string;
}

export class DisjoinRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    session_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {
        each: true
    })
    profiles_ids: number[];
}

export class EditPresenceRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsBoolean()
    present: boolean;
}


