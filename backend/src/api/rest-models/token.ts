import { IsNotEmpty, IsString, IsNumber } from "class-validator"

export class Token { 
    @IsNotEmpty()
    @IsString()
    token: string

    @IsNotEmpty()
    @IsNumber()
    uid: number 
}