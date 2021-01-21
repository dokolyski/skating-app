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

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {message:"INVALID"})
    firstname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z\-]+)$/i,{message:"INVALID"})
    lastname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsEmail({},{message:"INVALID"})
    email: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Length(8, 16)
    @PasswordPassRegexes()
    @PasswordPassEntrophyTest()
    password: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message:"MUST_BE_DATE_STRING"})
    birth_date: Date;

    @IsOptional()
    @IsString({message: "MUST_BE_STRING"})
    @IsPhoneNumber('PL')
    phone_number: string;
}

export class UserEditRequest extends UserRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    public id: number;
}
