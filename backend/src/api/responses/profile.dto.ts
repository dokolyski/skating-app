
export class ProfileResponse {

    id: number;

    user_id: number;

    is_owner: boolean;

    firstname: string;
    lastname: string;
    birth_date: Date;

    skill_level: string;

    // @Column({})
    //  readonly createdAt: Date;
    // @Column({})
    //  readonly updatedAt: Date
}