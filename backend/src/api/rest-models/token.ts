import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class Token {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsNumber()
    uid: number;

    @IsNotEmpty()
    @IsBoolean()
    isOrganizer: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isHAdmin: boolean;
}
