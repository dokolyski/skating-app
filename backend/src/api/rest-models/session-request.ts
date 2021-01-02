import {IsNotEmpty, IsNumber, IsString, IsDate, ValidateIf, IsIn} from 'class-validator';

export class SessionRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    owner_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @IsDate()
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

    @IsNotEmpty()
    @IsString()
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
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

