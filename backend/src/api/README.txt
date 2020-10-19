W tym folderze umieszczamy API komunikacyjne, tworzymy pliki, które będą zawierać definicje:
1) endpointów - umieszczamy je w komentarzach przed definicją modelu komunikacyjnego w formacie [METODA] [spacja] [URI]

2) modeli:
- pod metodą oraz URI endpointów umieszczamy najpierw przestrzeń nazw, której nazwa jest konkatenacją URI oraz metody użytych powyżej, w endpoincie, zamiast znaku '/' używamy '.' ze względu na jego specjalne znaczenie,

- w przestrzeni nazw zamieszczamy interfejsy INPUT oraz OUTPUT, w których definiujemy JSONy oczekiwane lub zwracane na danym endpoincie, można uprościć ich definicję poprzez zastosowanie 'type' zamiast 'interface',

- w przypadku pustego JSONa nie trzeba go definiować, wystarczy napisać w komentarzu // EMPTY BODY

API służy jako dokumentacja endpointów oraz jako typy do których następuje odniesienie w serwisach/kontrolerach, na frontendzie nastąpi dowiązanie symboliczne do tego folderu.

Przykład:
----------------------------
Nazwa pliku: login.ts
----------------------------
// POST USER/LOGIN
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
export namespace USER.LOGIN.POST {
    export interface INPUT {
        email: string
        password: string
    }
}

// DELETE USER/LOGIN
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
// EMPTY BODY

// GET USER/LOGIN
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
export namespace USER.LOGIN.GET {
    export interface INPUT {
        email: string
    }
}

// POST USER/LOGIN/RESET
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
export namespace USER.LOGIN.RESET.POST {
    export interface INPUT {
        token: string,
        email: string,
        password: string
    }
}

----------------------------