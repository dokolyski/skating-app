import {IsNotEmpty, IsNumber, IsString, IsIn, ValidateIf, IsDateString} from 'class-validator';

export class NotificationRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    session_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    owner_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message:"MUST_BE_DATE_STRING"})
    show_date: Date;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message:"MUST_BE_DATE_STRING"})
    expiration_date: Date;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['DISABLED', 'ENABLED'])
    status: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    title: string;

    @ValidateIf(o => o.description != null)
    @IsString({message: "MUST_BE_STRING"})
    description: string | null;
}

export class NotificationStatusRequest
{
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['READ', 'NONE'])
    status: string;
}