import {IsNotEmpty, IsNumber, IsString, IsDate, ValidateIf, IsIn, IsDateString, IsOptional} from 'class-validator';

export class SessionRequest {
    @IsNotEmpty()
    @IsNumber()
    owner_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    start_date: Date;

    @IsNotEmpty()
    @IsDateString()
    end_date: Date;

    @IsNotEmpty()
    @IsNumber()
    max_participants: number;

    @ValidateIf(o => o.difficulty != null)
    @IsString()
    @IsIn(['LOW', 'MEDIUM', 'HIGH'])
    difficulty: string | null;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ValidateIf(o => o.description != null)
    @IsString()
    description: string | null;

    @IsOptional()
    @IsString()
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}

export class SessionEditRequest extends SessionRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class SessionIndexRequest {
    @ValidateIf(o => o.date_from != null)
    @IsNotEmpty()
    @IsDate()
    date_from: Date | null;

    @ValidateIf(o => o.date_to != null)
    @IsNotEmpty()
    @IsDate()
    date_to: Date | null;
}

export class SessionStatusRequest {
    @IsNotEmpty()
    @IsString()
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}