import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class PaymentsSessions {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    session_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {
        each: true
    })
    profiles_id: number[];

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['POINTS', 'CASH'])
    format: string;
}
