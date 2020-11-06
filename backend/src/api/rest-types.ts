namespace VERIFICATION.LOGIN {
    interface INPUT {
        email: string, 
        password: string
    }
}

namespace VERIFICATION.REGISTER {
    interface INPUT {
        fistname: string,
        lastname: string,
        email: string, 
        password: string,
        birth_date: Date,
        phone_number: string
    }
}

namespace USER_INFO.GET {
    interface OUTPUT {
        fistname: string,
        lastname: string,
        email: string, 
        birth_date: Date,
        phone_number: string
    }
}

namespace USER_INFO.EDIT {
    interface INPUT {
        fistname: string,
        lastname: string,
        email: string, 
        birth_date: Date,
        phone_number: string
    }
}

namespace PROFILES.GET_PROFILES {
    type OUTPUT = {
        fistname: string,
        lastname: string,
        birth_date: string
    }[]
}

namespace PROFILES.CREATE {
    interface INPUT {
        fistname: string,
        lastname: string,
        birth_date: string
    }
}

namespace PROFILES.EDIT {
    interface INPUT {
        fistname: string,
        lastname: string,
        birth_date: string
    }
}

namespace SESSIONS.GET_SESSIONS {
    interface INPUT {
        date_from?: Date
        date_to?: Date
    }

    interface OUTPUT {
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

namespace SESSIONS.CREATE {
    interface INPUT {
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

namespace SESSIONS.EDIT {
    interface INPUT {
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

namespace SESSIONS.EDIT_STATUS {
    interface INPUT {
        status: number
    }
}

namespace SESSIONS.JOIN {
    interface INPUT {
        profiles_id: number[],
        session_id: number
    }
}

namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    interface OUTPUT {
        show_date: Date,
        expiration_date: Date,
        status: number,
        title: string,
        description?: string
        session_id: number
    }
}

namespace NOTIFICATIONS.CREATE {
    interface INPUT {
        show_date: Date,
        expiration_date: Date,
        status: number,
        title: string,
        description?: string
        session_id: number
    }
}

namespace NOTIFICATIONS.EDIT_STATUS {
    interface INPUT {
        status: number
    }
}