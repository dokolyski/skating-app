import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class Status {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['DISABLED', 'ENABLED'])
    status: string;
}
