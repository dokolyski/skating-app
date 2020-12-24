import { IsNotEmpty, IsNumber, IsDate, IsString, IsIn, ValidateIf } from "class-validator"

export const ALL_GROUP = 'ALL'
export const CREATE_GROUP = 'CREATE'

export class Notification {
    @IsNotEmpty({
        groups: [ALL_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_GROUP]
    })
    id: number

    @IsNotEmpty({
        groups: [ALL_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_GROUP]
    })
    user_id: number

    @IsNotEmpty({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    @IsNumber({}, {
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    session_id: number
    
    @IsNotEmpty({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    @IsDate({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    show_date: Date

    @IsNotEmpty({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    @IsDate({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    expiration_date: Date

    @IsNotEmpty({
        groups: [ALL_GROUP]
    })
    @IsString({
        groups: [ALL_GROUP]
    })
    @IsIn(['DISABLED', 'ENABLED'], {
        groups: [ALL_GROUP]
    })
    status: string

    @IsNotEmpty({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    title: string

    @ValidateIf(o => o.description != null, {
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_GROUP,
            CREATE_GROUP
        ]
    })
    description: string | null
}