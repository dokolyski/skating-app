// POST USER/LOGIN
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
export namespace USER.REGISTER.POST {
    export interface INPUT {
        email: string
        password: string
    }
}

// GET USER/REGISTER
export namespace USER.REGISTER.VERIFY.GET {
    export interface INPUT {
        id: string
        email: string
    }
}
