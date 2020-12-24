import { IsNotEmpty, IsNumber } from "class-validator";

export class SessionsSelection {
    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    sessions_id: number[]
}