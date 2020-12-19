import { IsNotEmpty, IsString, IsIn, IsEmail } from "class-validator"

export class LoginInfo {
    @IsNotEmpty({
        groups: ['VERIFICATION.LOGIN.PROVIDER'],
        context: {}
    })
    @IsString({
        groups: ['VERIFICATION.LOGIN.PROVIDER']
    })
    @IsIn(['GOOGLE', 'FACEBOOK'], {
        groups: ['VERIFICATION.LOGIN.PROVIDER']
    })
    provider: string

    @IsNotEmpty({
        groups: ['VERIFICATION.LOGIN.EMAIL']
    })
    @IsString({
        groups: ['VERIFICATION.LOGIN.EMAIL']
    })
    @IsEmail({}, {
        groups: ['VERIFICATION.LOGIN.EMAIL']
    })
    email: string

    @IsNotEmpty({
        groups: ['VERIFICATION.LOGIN.EMAIL']
    })
    @IsString({
        groups: ['VERIFICATION.LOGIN.EMAIL']
    })
    password: string
}