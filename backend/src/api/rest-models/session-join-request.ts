import { IsNotEmpty, IsNumber } from "class-validator"

export class SessionJoinRequest {
    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profile_ids: number[]

    @IsNotEmpty()
    @IsNumber()
    session_id: number
}
