import { IsNotEmpty, IsNumber, IsString, Matches, IsEmail, Length, IsDate, IsPhoneNumber } from 'class-validator';
import { PasswordPassEntrophyTest, PasswordPassRegexes } from '../rest-validators';

export const REGISTER_GROUP = 'REGISTER';
export const PART_GROUP = 'PART';
export const FULL_GROUP = 'FULL';
export const EDIT_GROUP = 'EDIT';

export class User {
    @IsNotEmpty({
        groups: [FULL_GROUP]
    })
    @IsNumber({}, {
        groups: [FULL_GROUP]
    })
    id: number;

    @IsNotEmpty({
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    @IsString({
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    firstname: string;

    @IsNotEmpty({
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    @IsString({
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            REGISTER_GROUP,
            PART_GROUP,
            EDIT_GROUP
        ]
    })
    lastname: string;

    @IsNotEmpty({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    @IsString({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    @IsEmail({}, {
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    email: string;

    @IsNotEmpty({
        groups: [REGISTER_GROUP]
    })
    @IsString({
        groups: [REGISTER_GROUP]
    })
    @Length(8, 16, {
        groups: [REGISTER_GROUP]
    })
    @PasswordPassRegexes({
        groups: [REGISTER_GROUP]
    })
    @PasswordPassEntrophyTest({
        groups: [REGISTER_GROUP]
    })
    password: string;

    @IsNotEmpty({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    @IsDate({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    birth_date: Date;

    @IsNotEmpty({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    @IsString({
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    @IsPhoneNumber('PL', {
        groups: [
            REGISTER_GROUP,
            FULL_GROUP,
            EDIT_GROUP
        ]
    })
    phone_number: string;
}
