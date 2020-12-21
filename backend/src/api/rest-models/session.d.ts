import { IsNotEmpty, IsNumber, IsString, IsDate, ValidateIf, IsIn } from "class-validator"

export const ALL_SESSION_GROUP = 'ALL'
export const CREATE_SESSION_GROUP = 'CREATE'
export const EDIT_SESSION_GROUP = 'EDIT'

export class Session {
    @IsNotEmpty({
        groups: [ALL_SESSION_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_SESSION_GROUP]
    })
    id: number

    @IsNotEmpty({
        groups: [ALL_SESSION_GROUP]
    })
    @IsNumber({}, {
        groups: [ALL_SESSION_GROUP]
    })
    owner_id: number

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    name: string

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsDate({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    start_date: Date

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsDate({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    end_date: Date

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsNumber({}, {
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    max_participants: number

    @ValidateIf(o => o.difficulty != null, {
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    difficulty: string | null

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsNumber({}, {
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    price: number

    @ValidateIf(o => o.description != null, {
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_SESSION_GROUP,
            CREATE_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    description: string | null

    @IsNotEmpty({
        groups: [
            ALL_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsString({
        groups: [
            ALL_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    @IsIn(['DISABLED', 'ENABLED'], {
        groups: [
            ALL_SESSION_GROUP,
            EDIT_SESSION_GROUP
        ]
    })
    status: string
}