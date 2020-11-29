import {IsDate, IsNotEmpty, IsEmail, IsNumber} from 'class-validator';

// POST USER/LOGIN
// [TUTAJ KRÓTKI OPIS DZIAŁANIA METODY + ZWRACANY KOD STATUSU]
export namespace USER {
    export class POST {

        @IsNotEmpty()
        @IsEmail()
        email: string;

        @IsNotEmpty()
        password: string;

        @IsNotEmpty()
        @IsDate()
        birth_date: Date;

        phone_number: string;

        @IsNotEmpty()
        firstname: string;
        @IsNotEmpty()
        lastname: string;
    }
}

// GET USER/REGISTER
export namespace USER {
    export class GET {
        @IsNotEmpty()
        @IsNumber()
        id: number
    }
}
