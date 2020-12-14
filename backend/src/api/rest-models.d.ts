type JStypes = null | string | number | boolean | Date

export type RestJSON = JStypes | JStypes[] | {
    [property: string]: RestJSON[] | RestJSON
}

export type User = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    birth_date: Date,
    phone_number: string
}

export type Token = string

export type Provider = {
    token: Token,
    provider: 'GOOGLE' | 'FACEBOOK'
}

export type Email = {
    email: string,
    password: string
}
export type Profile = {
    firstname: string,
    lastname: string,
    birth_date: Date,
    skill_level: string | null,
    type: 'OWNER' | 'PROFILE',
}

export type DateRange = {
    date_from: Date | null
    date_to: Date | null
}

export type Session = {
    name: string,
    start_date: Date,
    end_date: Date,
    max_participants: number,
    difficulty: string | null,
    price: number,
    description: string | null,
    status: string,
    owner_name: string,
    owner_lastname: string
}

export type SessionJoin = {
    profiles_id: number[],
    session_id: number
}

export type Notification = {
    show_date: Date,
    expiration_date: Date,
    status: string,
    title: string,
    description: string | null,
    session_id: number
}

export type Status = {
    status: string
}