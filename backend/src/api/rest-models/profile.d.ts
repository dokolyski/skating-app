import { IsNotEmpty, IsNumber, IsString, Matches, IsDate, ValidateIf, IsIn } from "class-validator"

export const ALL_PROFILES_GROUP = 'ALL'
export const CREATE_PROFILE_GROUP = 'CREATE'
export const EDIT_PROFILE_GROUP = 'EDIT'

export class Profile {
    @IsNotEmpty({
        groups: [ALL_PROFILES_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_PROFILES_GROUP]
    })
    id: number

    @IsNotEmpty({
        groups: [ALL_PROFILES_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_PROFILES_GROUP]
    })
    user_id: number

    @IsNotEmpty({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    firstname: string

    @IsNotEmpty({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @Matches(/^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i, {
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    lastname: string

    @IsNotEmpty({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @IsDate({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    birth_date: Date

    @ValidateIf(o => o.skill_level != null, {
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
        groups: [
            ALL_PROFILES_GROUP,
            CREATE_PROFILE_GROUP,
            EDIT_PROFILE_GROUP
        ]
    })
    skill_level: string | null

    @IsNotEmpty({
        groups: [ALL_PROFILES_GROUP]
    })
    @IsString({
        groups: [ALL_PROFILES_GROUP]
    })
    @IsIn(['OWNER', 'PROFILE'], {
        groups: [ALL_PROFILES_GROUP]
    })
    type: string
}