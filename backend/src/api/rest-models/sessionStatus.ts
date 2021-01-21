import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class SessionStatus {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['OPEN', 'CLOSED', 'CANCELLED'])
    status: string;
}
