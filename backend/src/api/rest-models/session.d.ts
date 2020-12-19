import { IsNotEmpty, IsNumber, IsString, IsDate, ValidateIf, IsIn } from "class-validator"

export class Session {
    @IsNotEmpty({
        groups: ['SESSIONS.GET_SESSIONS']
    })
    @IsNumber({}, {
        groups: ['SESSIONS.GET_SESSIONS']
    })
    id: number

    @IsNotEmpty({
        groups: ['SESSIONS.GET_SESSIONS']
    })
    @IsNumber({}, {
        groups: ['SESSIONS.GET_SESSIONS']
    })
    owner_id: number

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsString({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    name: string

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsDate({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    start_date: Date

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsDate({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    end_date: Date

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsNumber({}, {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    max_participants: number

    @ValidateIf(o => o.difficulty != null, {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsString({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    difficulty: string | null

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsNumber({}, {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    price: number

    @ValidateIf(o => o.description != null, {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    @IsString({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.CREATE',
            'SESSIONS.EDIT'
        ]
    })
    description: string | null

    @IsNotEmpty({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.EDIT'
        ]
    })
    @IsString({
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.EDIT'
        ]
    })
    @IsIn(['DISABLED', 'ENABLED'], {
        groups: [
            'SESSIONS.GET_SESSIONS',
            'SESSIONS.EDIT'
        ]
    })
    status: string
}