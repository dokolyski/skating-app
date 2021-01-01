import {IsNotEmpty, IsNumber, IsString, Matches, IsDate, ValidateIf, IsIn} from 'class-validator';

export class ProfileRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i)
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i)
    lastname: string;

    @IsNotEmpty()
    @IsDate()
    birth_date: Date;

    @ValidateIf(o => o.skill_level != null)
    @IsString()
    @IsIn(['LOW', 'MEDIUM', 'HIGH'])
    skill_level: string | null;

    @IsNotEmpty()
    @IsString()
    @IsIn(['OWNER', 'PROFILE'])
    type: string;
}

export class ProfileIndexRequest {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
