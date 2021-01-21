import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentsPoints {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    option_id: number;
}
