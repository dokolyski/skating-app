type JStypes = null|string|number|boolean|Date
export type RestJSON = JStypes|JStypes[]| {
    [property: string]: RestJSON[] | RestJSON
}

export namespace VERIFICATION.LOGIN {
    export type Token = string
    export type Provider = {
        token: Token,
        provider: 'GOOGLE' | 'FACEBOOK'
    }
    export type Email = {
        email: string, 
        password: string
    }

    export type INPUT = Provider | Email
    export type OUTPUT = Token
}

export namespace VERIFICATION.REGISTER {
    export type INPUT = {
        fistname: string,
        lastname: string,
        email: string, 
        password: string,
        birth_date: Date,
        phone_number: string
    }
}

export namespace USER_INFO.GET {
    export type OUTPUT = {
        fistname: string,
        lastname: string,
        email: string, 
        birth_date: Date,
        phone_number: string
    }
}

export namespace USER_INFO.EDIT {
    export type INPUT = {
        fistname: string,
        lastname: string,
        email: string, 
        birth_date: Date,
        phone_number: string
    }
}

export namespace PROFILES.GET_PROFILES {
    type OUTPUT = {
        fistname: string,
        lastname: string,
        birth_date: string,
        skill_level: string | null,
        type: 'OWNER' | 'PROFILE',
    }[]
}

export namespace PROFILES.CREATE {
    export type INPUT = {
        fistname: string,
        lastname: string,
        birth_date: Date,
        skill_level: string | null
    }
}

export namespace PROFILES.EDIT {
    export type INPUT = {
        fistname: string,
        lastname: string,
        birth_date: Date,
        skill_level: string | null
    }
}

export namespace SESSIONS.GET_SESSIONS {
    export type INPUT = {
        date_from: Date | null
        date_to: Date | null
    }

    export type OUTPUT = {
        name: string,
        start_date: Date,
        end_date: Date,
        max_participants: number,
        difficulty: number | null,
        price: number,
        description: string | null,
        status: number,
        owner_name: string,
        owner_lastname: string
    }
}

export namespace SESSIONS.CREATE {
    export type INPUT = {
        name: string,
        start_date: Date,
        end_date: Date,
        max_participants: number,
        difficulty: number | null,
        price: number,
        description: string | null,
        status: number
    }
}

export namespace SESSIONS.EDIT {
    export type INPUT = {
        name: string,
        start_date: Date,
        end_date: Date,
        max_participants: number,
        difficulty: number | null,
        price: number,
        description: string | null,
        status: number
    }
}

export namespace SESSIONS.EDIT_STATUS {
    export type INPUT = {
        status: number
    }
}

export namespace SESSIONS.JOIN {
    export type INPUT = {
        profiles_id: number[],
        session_id: number
    }
}

export namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    export type OUTPUT = {
        show_date: Date,
        expiration_date: Date,
        status: number,
        title: string,
        description: string | null,
        session_id: number
    }
}

export namespace NOTIFICATIONS.CREATE {
    export type INPUT = {
        show_date: Date,
        expiration_date: Date,
        status: number,
        title: string,
        description: string | null,
        session_id: number
    }
}

export namespace NOTIFICATIONS.EDIT_STATUS {
    export type INPUT = {
        status: number
    }
}

export namespace CONFIG.GET {
    export type OUTPUT = RestJSON
}