import { IsNotEmpty, IsNumber, IsString, Matches, IsEmail, Length, IsDate, IsPhoneNumber } from "class-validator"
import { PasswordPassEntrophyTest, PasswordPassRegexes } from '../rest-validators'

export class User {
    @IsNotEmpty({
        groups: ['USER_INFO.GET.FULL']
    })
    @IsNumber({}, {
        groups: ['USER_INFO.GET.FULL']
    })
    id: number

    @IsNotEmpty({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    @IsString({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    firstname: string

    @IsNotEmpty({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    @IsString({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.PART',
            'USER_INFO.EDIT'
        ]
    })
    lastname: string

    @IsNotEmpty({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    @IsString({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    @IsEmail({}, {
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    email: string

    @IsNotEmpty({
        groups: ['VERIFICATION.REGISTER']
    })
    @IsString({
        groups: ['VERIFICATION.REGISTER']
    })
    @Length(8, 16, {
        groups: ['VERIFICATION.REGISTER']
    })
    @PasswordPassRegexes({
        groups: ['VERIFICATION.REGISTER']
    })
    @PasswordPassEntrophyTest({
        groups: ['VERIFICATION.REGISTER']
    })
    password: string

    @IsNotEmpty({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    @IsDate({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    birth_date: Date

    @IsNotEmpty({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    @IsString({
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    @IsPhoneNumber('PL', {
        groups: [
            'VERIFICATION.REGISTER',
            'USER_INFO.GET.FULL',
            'USER_INFO.EDIT'
        ]
    })
    phone_number: string
}