import { IsNotEmpty, IsNumber } from "class-validator"

export class SessionJoin {
    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_id: number[]

    @IsNotEmpty()
    @IsNumber()
    session_id: number
}