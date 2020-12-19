type JStypes = null | string | number | boolean | Date

export type RestJSON = JStypes | JStypes[] | {
    [property: string]: RestJSON[] | RestJSON
}

export type Token = { token: string, uid: number }

export type Provider = {
    provider: 'GOOGLE' | 'FACEBOOK'
}

export type SendFullInfo = { 
    full: boolean 
}

export type EmailSignInInfo = {
    email: string,
    password: string
}

export type DateRange = {
    date_from: Date | null
    date_to: Date | null
}

export type SessionJoin = {
    profiles_id: number[],
    session_id: number
}

export type SessionsSelection = {
    sessions_id: number[]
}

export type TransactionPoints = {
    option_id: number
}

export type TransactionSessions = {
    session_id: number,
    profiles_id: number[]
}

export type Status = {
    status: string
}

//----------------------

export type User = {
    id: number,

    firstname: string,
    lastname: string,
    email: string,
    password: string,
    birth_date: Date,
    phone_number: string
}

export type Profile = {
    id: number,
    user_id: number,

    firstname: string,
    lastname: string,
    birth_date: Date,
    skill_level: string | null,
    type: 'OWNER' | 'PROFILE',
}

export type Session = {
    id: number,
    owner_id: number,

    name: string,
    start_date: Date,
    end_date: Date,
    max_participants: number,
    difficulty: string | null,
    price: number,
    description: string | null,
    status: string,
}

export type Notification = {
    id: number,
    user_id: number,
    session_id: number,

    show_date: Date,
    expiration_date: Date,
    status: string,
    title: string,
    description: string | null,
}