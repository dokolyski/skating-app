import {IsNotEmpty, IsNumber, IsString, Matches, IsDate, ValidateIf, IsIn, IsDateString} from 'class-validator';

export class ProfileRequest {

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    user_id: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i,{message:"INVALID"})
    firstname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z\-]+)$/i, {message:"INVALID"})
    lastname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString()
    birth_date: Date;

    @ValidateIf(o => o.skill_level != null)
    @IsString({message: "MUST_BE_STRING"})
    skill_level: string | null;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['OWNER', 'PROFILE'])
    type: string = 'PROFILE';
}

export class ProfileEditRequest extends ProfileRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    id: number;
}
