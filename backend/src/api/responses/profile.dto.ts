export class ProfileResponse {
    id: number;
    user_id: number;
    is_owner: boolean;
    firstname: string;
    lastname: string;
    birth_date: Date;
    skill_level: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProfileSimplifiedResponse {
    id: number;
    user_id: number;
    firstname: string;
    lastname: string;
}