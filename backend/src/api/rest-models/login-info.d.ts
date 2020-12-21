import { IsNotEmpty, IsString, IsIn, IsEmail } from "class-validator"

export const PROVIDER_GROUP = 'PROVIDER'
export const EMAIL_GROUP = 'EMAIL'

export class LoginInfo {
    @IsNotEmpty({
        groups: [PROVIDER_GROUP]
    })
    @IsString({
        groups: [PROVIDER_GROUP]
    })
    @IsIn(['GOOGLE', 'FACEBOOK'], {
        groups: [PROVIDER_GROUP]
    })
    provider: string

    @IsNotEmpty({
        groups: []
    })
    @IsString({
        groups: [EMAIL_GROUP]
    })
    @IsEmail({}, {
        groups: [EMAIL_GROUP]
    })
    email: string

    @IsNotEmpty({
        groups: [EMAIL_GROUP]
    })
    @IsString({
        groups: [EMAIL_GROUP]
    })
    password: string
}