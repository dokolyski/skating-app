import {IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator"

export class SessionJoin {
    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_ids: number[]

    @IsNotEmpty()
    @IsNumber()
    session_id: number

    @IsNotEmpty()
    @IsString()
    @IsIn(['POINTS', 'CASH'])
    format: string;
}