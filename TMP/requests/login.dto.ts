import {IsNotEmpty, IsString, IsIn, IsEmail} from 'class-validator';


export class LoginRequest {
    @IsNotEmpty()
    @IsString()
    @IsIn(['GOOGLE', 'FACEBOOK', 'EMAIL'])
    provider: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
