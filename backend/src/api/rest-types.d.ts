import { DateRange, Email, Notification, Profile, Provider, RestJSON, Session, SessionJoin, Status, Token, User } from './rest-models.d'

export namespace VERIFICATION.LOGIN {
    export type INPUT = Provider | Email
    export type OUTPUT = Token
}

export namespace VERIFICATION.REGISTER {
    export type INPUT = User
}

export namespace USER_INFO.GET {
    export type OUTPUT = Omit<User, 'password'>
}

export namespace USER_INFO.EDIT {
    export type INPUT = Omit<User, 'password'>
}

export namespace PROFILES.GET_PROFILES {
    export type OUTPUT = Profile[]
}

export namespace PROFILES.CREATE {
    export type INPUT = Omit<Profile, 'type'>
}

export namespace PROFILES.EDIT {
    export type INPUT = Omit<Profile, 'type'>
}

export namespace SESSIONS.GET_SESSIONS {
    export type INPUT = DateRange
    export type OUTPUT = Session[]
}

export namespace SESSIONS.CREATE {
    export type INPUT = Omit<Session, 'owner_name'|'owner_lastname'>
}

export namespace SESSIONS.EDIT {
    export type INPUT = Omit<Session, 'owner_name'|'owner_lastname'>
}

export namespace SESSIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace SESSIONS.JOIN {
    export type INPUT = SessionJoin
}

export namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    export type OUTPUT = Notification[]
}

export namespace NOTIFICATIONS.CREATE {
    export type INPUT = Notification
}

export namespace NOTIFICATIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace CONFIG.GET {
    export type OUTPUT = RestJSON
}