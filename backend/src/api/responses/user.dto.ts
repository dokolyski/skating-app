export class UserResponse {
    public id: number;
    public email: string;
    public password: string;
    public isOrganizer: boolean;
    public isAdmin: boolean;
    public isHAdmin: boolean;
    public birth_date: Date;
    public phone_number: string;
    public verified: boolean;
    public token: string;
    public password_reset_token: string;
    public password_reset_token_expiration_date: Date;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

export class UserSimplifiedResponse {
    public id: number;
    public email: string;
    public isOrganizer: boolean;
    public isAdmin: boolean;
    public isHAdmin: boolean;
    public birth_date: Date;
    public phone_number: string;
}