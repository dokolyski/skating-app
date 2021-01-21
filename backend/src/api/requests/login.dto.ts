import {IsNotEmpty, IsString, IsIn, IsEmail} from 'class-validator';


export class LoginRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['GOOGLE', 'FACEBOOK', 'EMAIL'])
    provider: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsEmail({},{message:"INVALID"})
    email: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    password: string;
}
