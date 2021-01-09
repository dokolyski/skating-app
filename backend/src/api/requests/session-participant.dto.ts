import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class SessionParticipantJoinRequest {
    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_ids: number[];

    @IsNotEmpty()
    @IsString()
    @IsIn(['POINTS', 'CASH'])
    format: string;
}

export class SessionParticipantDisjoinRequest {
    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_ids: number[];
}

