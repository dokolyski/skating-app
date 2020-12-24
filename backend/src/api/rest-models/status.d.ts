import { IsNotEmpty, IsString, IsIn } from "class-validator";

export class Status {
    @IsNotEmpty()
    @IsString()
    @IsIn(['DISABLED', 'ENABLED'])
    status: string
}