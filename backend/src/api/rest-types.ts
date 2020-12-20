import { DateRange } from './rest-models/date-range'
import { EMAIL_GROUP, LoginInfo, PROVIDER_GROUP } from './rest-models/login-info'
import { Notification, ALL_GROUP, CREATE_GROUP } from './rest-models/notification'
import { PaymentsPoints } from './rest-models/payments-points'
import { PaymentsSessions } from './rest-models/payments-sessions'
import { Profile, ALL_PROFILES_GROUP, CREATE_PROFILE_GROUP, EDIT_PROFILE_GROUP } from './rest-models/profile'
import { RestJSON } from './rest-models/rest-json'
import { SendFullInfo } from './rest-models/send-full-info'
import { SessionJoin } from './rest-models/session-join'
import { SessionsSelection } from './rest-models/session-selection'
import { Session, ALL_SESSION_GROUP, CREATE_SESSION_GROUP, EDIT_SESSION_GROUP } from './rest-models/session'
import { Status } from './rest-models/status'
import { Token } from './rest-models/token'
import { REGISTER_GROUP, PART_GROUP, FULL_GROUP, EDIT_GROUP, User } from './rest-models/user'

export namespace VERIFICATION.LOGIN {
    export const GROUPS = {
        INPUT: { PROVIDER_GROUP, EMAIL_GROUP }
    }

    export type INPUT = LoginInfo
    export type OUTPUT = Token
}

export namespace VERIFICATION.REGISTER {
    export const GROUPS = {
        INPUT: { REGISTER_GROUP }
    }

    export type INPUT = User
}

export namespace USER_INFO.GET {
    export const GROUPS = {
        OUTPUT: { PART_GROUP, FULL_GROUP }
    }

    export type INPUT = SendFullInfo
    export type OUTPUT = User
}

export namespace USER_INFO.EDIT {
    export const GROUPS = {
        INPUT: { EDIT_GROUP }
    }

    export type INPUT = User
}

export namespace PROFILES.GET_PROFILES {
    export const GROUPS = {
        OUTPUT: { ALL_PROFILES_GROUP }
    }

    export type OUTPUT = Profile
}

export namespace PROFILES.CREATE {
    export const GROUPS = {
        INPUT: { CREATE_PROFILE_GROUP }
    }

    export type INPUT = Profile
}

export namespace PROFILES.EDIT {
    export const GROUPS = {
        INPUT: { EDIT_PROFILE_GROUP }
    }

    export type INPUT = Profile
}

export namespace SESSIONS.GET_SESSIONS {
    export const GROUPS = {
        OUTPUT: { ALL_SESSION_GROUP }
    }

    export type INPUT = DateRange
    export type OUTPUT = Session[]
}

export namespace SESSIONS.CREATE {
    export const GROUPS = {
        INPUT: { CREATE_SESSION_GROUP }
    }

    export type INPUT = Session
}

export namespace SESSIONS.EDIT {
    export const GROUPS = {
        INPUT: { EDIT_SESSION_GROUP }
    }

    export type INPUT = Session
}

export namespace SESSIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace SESSION_PARTICIPANTS.JOIN {
    export type INPUT = SessionJoin
}

export namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    export const GROUPS = {
        OUTPUT: { ALL_GROUP }
    }

    export type INPUT = SessionsSelection
    export type OUTPUT = Notification[]
}

export namespace NOTIFICATIONS.CREATE {
    export const GROUPS = {
        INPUT: { CREATE_GROUP }
    }

    export type INPUT = Notification
}

export namespace NOTIFICATIONS.EDIT_STATUS {
    export type INPUT = Status
}

export namespace PAYMENTS.BUY_POINTS {
    export type INPUT = PaymentsPoints
}

export namespace PAYMENTS.BUY_SESSIONS {
    export type INPUT = PaymentsSessions
}

export namespace CONFIG.GET {
    export type OUTPUT = RestJSON
}
