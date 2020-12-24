import { IsNotEmpty, IsNumber } from "class-validator";

export class PaymentsPoints {
    @IsNotEmpty()
    @IsNumber()
    option_id: number
}