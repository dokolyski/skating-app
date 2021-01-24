import {IsNotEmpty, IsNumber, IsString, IsDate, ValidateIf, IsIn, IsDateString, IsOptional} from 'class-validator';

export class SessionRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    owner_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    name: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message:"MUST_BE_DATE_STRING"})
    start_date: Date;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message:"MUST_BE_DATE_STRING"})
    end_date: Date;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    max_participants: number;

    @ValidateIf(o => o.difficulty != null)
    @IsString({message: "MUST_BE_STRING"})
    difficulty: string | null;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    price: number;

    @ValidateIf(o => o.description != null)
    @IsString({message: "MUST_BE_STRING"})
    description: string | null;

    @IsOptional()
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}

export class SessionEditRequest extends SessionRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    id: number;
}

export class SessionIndexRequest {
    @ValidateIf(o => o.date_from != null)
    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString()
    date_from: Date | null;

    @ValidateIf(o => o.date_to != null)
    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString()
    date_to: Date | null;
}

export class SessionStatusRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}