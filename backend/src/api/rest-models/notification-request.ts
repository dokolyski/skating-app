import {IsNotEmpty, IsNumber, IsDate, IsString, IsIn, ValidateIf} from 'class-validator';

export class NotificationRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    session_id: number;

    @IsNotEmpty()
    @IsDate()
    show_date: Date;

    @IsNotEmpty()
    @IsDate()
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