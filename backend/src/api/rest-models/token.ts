import {IsNotEmpty, IsString, IsNumber, IsBoolean} from 'class-validator';

export class Token {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    token: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    uid: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsBoolean()
    isOrganizer: boolean;

    @IsNotEmpty({message: "REQUIRED"})
    @IsBoolean()
    isAdmin: boolean;

    @IsNotEmpty({message: "REQUIRED"})
    @IsBoolean()
    isHAdmin: boolean;
}
