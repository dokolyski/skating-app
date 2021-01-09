import {IsNotEmpty, IsNumber, IsDate, IsString, IsIn, ValidateIf, IsDateString} from 'class-validator';

export class NotificationRequest {
    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsNumber()
    owner_id: number;

    @IsNotEmpty()
    @IsDateString()
    show_date: Date;

    @IsNotEmpty()
    @IsDateString()
    expiration_date: Date;

    @IsNotEmpty()
    @IsString()
    @IsIn(['DISABLED', 'ENABLED'])
    status: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @ValidateIf(o => o.description != null)
    @IsString()
    description: string | null;
}

export class NotificationIndexRequest {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}

export class NotificationEditStatusRequest
{
    @IsNotEmpty()
    @IsString()
    @IsIn(['READ', 'NONE'])
    status: string;
}