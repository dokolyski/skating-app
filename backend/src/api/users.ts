import {IsNotEmpty, IsEmail, IsNumber, IsDateString} from 'class-validator';

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
        @IsDateString()
        birth_date: string;

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
