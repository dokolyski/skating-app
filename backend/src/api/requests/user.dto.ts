import {
    IsDateString,
    IsEmail,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length
} from 'class-validator';
import {PasswordPassEntrophyTest, PasswordPassRegexes} from '../rest-validators';

export class UserRequest {

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    firstname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    lastname: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsEmail({}, {message: "INVALID"})
    email: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @Length(8, 16, {message: "LENGTH"})
    @PasswordPassRegexes()
    @PasswordPassEntrophyTest()
    password: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsDateString({message: "MUST_BE_DATE_STRING"})
    birth_date: Date | null;

    @IsOptional()
    @IsString({message: "MUST_BE_STRING"})
    @IsPhoneNumber('PL')
    phone_number: string | null;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsIn(['GOOGLE', 'FACEBOOK', 'EMAIL'])
    provider: string = "EMAIL";
}

export class UserEditRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    @IsEmail({}, {message: "INVALID"})
    email: string;

    @IsOptional()
    @IsString({message: "MUST_BE_STRING"})
    @IsPhoneNumber('PL')
    phone_number: string | null;
}

export class UserAddPointsRequest {
    @IsNotEmpty({message: "REQUIRED"})
    @IsInt()
    pointsAmount: number;

    @IsNotEmpty({message: "REQUIRED"})
    @IsInt()
    price: number;
}

