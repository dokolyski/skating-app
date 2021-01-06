import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Matches,
    IsEmail,
    Length,
    IsDate,
    IsPhoneNumber,
    IsOptional,
    IsDateString
} from 'class-validator';
import {PasswordPassEntrophyTest, PasswordPassRegexes} from '../rest-validators';

export class UserRequest {

    @IsNotEmpty()
    @IsString()
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i)
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i)
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    @PasswordPassRegexes()
    @PasswordPassEntrophyTest()
    password: string;

    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('PL')
    phone_number: string;
}

export class UserEditRequest extends UserRequest {
    @IsNotEmpty()
    @IsNumber()
    public id: number;
}
