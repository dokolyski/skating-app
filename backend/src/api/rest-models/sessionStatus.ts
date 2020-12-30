import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class SessionStatus {
    @IsNotEmpty()
    @IsString()
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}
