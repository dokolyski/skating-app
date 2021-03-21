export class OrderPosition {

    profile_id: number;
    session_id: number;

    firstname: string;
    lastname: string;

    start_date: Date;
    end_date: Date;

    amount: number;

}

export class JoinResponse {

    firstname: string;
    lastname: string;
    email: string;

    amount: number;
    positions: OrderPosition[];
    type: string;
}
