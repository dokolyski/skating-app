import { DateRange } from './rest-models/date-range'
import { LoginInfo } from './rest-models/login-info'
import { Notification } from './rest-models/notification'
import { PaymentsPoints } from './rest-models/payments-points'
import { PaymentsSessions } from './rest-models/payments-sessions'
import { Profile } from './rest-models/profile'
import { RestJSON } from './rest-models/rest-json'
import { SendFullInfo } from './rest-models/send-full-info'
import { SessionJoin } from './rest-models/session-join'
import { SessionsSelection } from './rest-models/session-selection'
import { Session } from './rest-models/session'
import { Status } from './rest-models/status'
import { Token } from './rest-models/token'
import { User } from './rest-models/user'

export namespace VERIFICATION.LOGIN {
    export type INPUT = LoginInfo
    export type OUTPUT = Token
}

export namespace VERIFICATION.REGISTER {
    export type INPUT = User
}

export namespace USER_INFO.GET {
    export type INPUT = SendFullInfo
    export type OUTPUT = User
}

export namespace USER_INFO.EDIT {
    export type INPUT = User
}

export namespace PROFILES.GET_PROFILES {
    export type OUTPUT = Profile
}

export namespace PROFILES.CREATE {
    export type INPUT = Profile
}

export namespace PROFILES.EDIT {
    export type INPUT = Profile
}

export namespace SESSIONS.GET_SESSIONS {
    export type INPUT = DateRange
    export type OUTPUT = Session[]
}

export namespace SESSIONS.CREATE {
    export type INPUT = Session
}

export namespace SESSIONS.EDIT {
    export type INPUT = Session
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
