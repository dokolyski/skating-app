import {User} from "../../users/user.entity";

export class UserResponse extends User {
}

export class UserSimplifiedResponse {
    public id: number;
    public email: string;
    public account_type: 'USER' | 'ORGANIZER' | 'ADMIN';
    public birth_date: Date;
    public phone_number: string;
}