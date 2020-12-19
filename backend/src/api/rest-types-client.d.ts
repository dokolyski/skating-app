import { DateRange, EmailSignInInfo, Notification, Profile, Provider, RestJSON, SendFullInfo, Session, SessionJoin, SessionsSelection, Status, Token, TransactionPoints, TransactionSessions, User } from './rest-models.d'

export namespace VERIFICATION.LOGIN {
    export type INPUT = Provider | EmailSignInInfo
    export type OUTPUT = Token
}

export namespace VERIFICATION.REGISTER {
    export type INPUT = Omit<User, 'id'>
}

export namespace USER_INFO.GET {
    export type INPUT = SendFullInfo
    export type OUTPUT = Omit<User, 'password'> | Pick<Profile, 'firstname'|'lastname'>
    // if full true then send User with all infos, else send Profile with firstname and lastname
}

export namespace USER_INFO.EDIT {
    export type INPUT = Omit<User, 'id'|'password'>
}

export namespace PROFILES.GET_PROFILES {
    export type OUTPUT = Profile[]
}

export namespace PROFILES.CREATE {
    export type INPUT = Omit<Profile, 'id'|'user_id'|'type'>
}

export namespace PROFILES.EDIT {
    export type INPUT = Omit<Profile, 'id'|'user_id'|'type'>
}

export namespace SESSIONS.GET_SESSIONS {
    export type INPUT = DateRange
    export type OUTPUT = Session[]
}

export namespace SESSIONS.CREATE {
    export type INPUT = Omit<Session, 'id'|'owner_id'>
}

export namespace SESSIONS.EDIT {
    export type INPUT = Omit<Session, 'id'|'owner_id'>
}

export namespace SESSIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace SESSION_PARTICIPANTS.JOIN {
    export type INPUT = SessionJoin
}

export namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    export type INPUT = SessionsSelection
    export type OUTPUT = Notification[]
}

export namespace NOTIFICATIONS.CREATE {
    export type INPUT = Omit<Notification, 'id'|'user_id'>
}

export namespace NOTIFICATIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace TRANSACTIONS.BUY_POINTS {
    export type INPUT = TransactionPoints
}

export namespace TRANSACTIONS.BUY_SESSIONS {
    export type INPUT = TransactionSessions
}

export namespace CONFIG.GET {
    export type OUTPUT = RestJSON
}
