import { IsNotEmpty, IsNumber, IsString, Matches, IsDate, ValidateIf, IsIn } from "class-validator"

export class Profile {
    @IsNotEmpty({
        groups: ['PROFILES.GET_PROFILES']
    })
    @IsNumber({}, {
        groups: ['PROFILES.GET_PROFILES']
    })
    id: number

    @IsNotEmpty({
        groups: ['PROFILES.GET_PROFILES']
    })
    @IsNumber({}, {
        groups: ['PROFILES.GET_PROFILES']
    })
    user_id: number

    @IsNotEmpty({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @IsString({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    firstname: string

    @IsNotEmpty({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @IsString({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    lastname: string

    @IsNotEmpty({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @IsDate({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    birth_date: Date

    @ValidateIf(o => o.skill_level != null, {
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @IsString({
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
        groups: [
            'PROFILES.GET_PROFILES',
            'PROFILES.CREATE',
            'PROFILES.EDIT'
        ]
    })
    skill_level: string | null

    @IsNotEmpty({
        groups: ['PROFILES.GET_PROFILES']
    })
    @IsString({
        groups: ['PROFILES.GET_PROFILES']
    })
    @IsIn(['OWNER', 'PROFILE'], {
        groups: ['PROFILES.GET_PROFILES']
    })
    type: string
}