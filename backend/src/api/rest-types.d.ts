type JStypes = null|string|number|boolean|Date
export type RestJSON = JStypes|JStypes[]| {
    [property: string]: RestJSON[] | RestJSON
}

export namespace VERIFICATION.LOGIN {
    export type INPUT = {
        email: string, 
        password: string
    }
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
        birth_date: string
    }[]
}

export namespace PROFILES.CREATE {
    export type INPUT = {
        fistname: string,
        lastname: string,
        birth_date: Date,
        skill_level?: string
    }
}

export namespace PROFILES.EDIT {
    export type INPUT = {
        fistname: string,
        lastname: string,
        birth_date: Date,
        skill_level?: string
    }
}

export namespace SESSIONS.GET_SESSIONS {
    export type INPUT = {
        date_from?: Date
        date_to?: Date
    }

    export type OUTPUT = {
        name: string,
        start_date: Date,
        end_date: Date,
        max_participants: number,
        difficulty?: number,
        price: number,
        description?: string,
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
        difficulty?: number,
        price: number,
        description?: string,
        status: number
    }
}

export namespace SESSIONS.EDIT {
    export type INPUT = {
        name: string,
        start_date: Date,
        end_date: Date,
        max_participants: number,
        difficulty?: number,
        price: number,
        description?: string,
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
        description?: string
        session_id: number
    }
}

export namespace NOTIFICATIONS.CREATE {
    export type INPUT = {
        show_date: Date,
        expiration_date: Date,
        status: number,
        title: string,
        description?: string
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