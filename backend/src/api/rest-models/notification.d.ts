import { IsNotEmpty, IsNumber, IsDate, IsString, IsIn, ValidateIf } from "class-validator"

export class Notification {
    @IsNotEmpty({
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    @IsNumber({}, {
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    id: number

    @IsNotEmpty({
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    @IsNumber({}, {
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    user_id: number

    @IsNotEmpty({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    @IsNumber({}, {
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    session_id: number
    
    @IsNotEmpty({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    @IsDate({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    show_date: Date

    @IsNotEmpty({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    @IsDate({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    expiration_date: Date

    @IsNotEmpty({
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    @IsString({
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    @IsIn(['DISABLED', 'ENABLED'], {
        groups: ['NOTIFICATIONS.GET_NOTIFICATIONS']
    })
    status: string

    @IsNotEmpty({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    @IsString({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    title: string

    @ValidateIf(o => o.description != null, {
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    @IsString({
        groups: [
            'NOTIFICATIONS.GET_NOTIFICATIONS',
            'NOTIFICATIONS.CREATE'
        ]
    })
    description: string | null
}