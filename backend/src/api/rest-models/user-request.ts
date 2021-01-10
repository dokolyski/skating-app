import {IsNotEmpty, IsNumber, IsString, Matches, IsEmail, Length, IsDate, IsPhoneNumber, IsBoolean} from 'class-validator';
import {PasswordPassEntrophyTest, PasswordPassRegexes} from '../rest-validators';

export class UserRequest {
    @IsNotEmpty()
    @IsNumber()
    id: number;

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
    @IsDate()
    birth_date: Date;

    @IsString()
    @IsPhoneNumber('PL')
    phone_number: string;

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
