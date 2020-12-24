import { IsNotEmpty, IsNumber, IsString, IsIn } from "class-validator"

export class PaymentsSessions {
    @IsNotEmpty()
    @IsNumber()
    session_id: number

    @IsNotEmpty()
    @IsNumber({}, {
        each: true
    })
    profiles_id: number[]

    @IsNotEmpty()
    @IsString()
    @IsIn(['POINTS', 'CASH'])
    format: string
}