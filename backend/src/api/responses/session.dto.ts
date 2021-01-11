import {UserSimplifiedResponse} from "./user.dto";
import {ProfileSimplifiedResponse} from "./profile.dto";

export default class SessionResponse {

    id: number
    owner: UserSimplifiedResponse;
    profiles: ProfileSimplifiedResponse[];
    name: string
    start_date: Date
    end_date: Date
    max_participants: number
    difficulty: string
    price: number
    description: string
    status: string
    createdAt: Date
    updatedAt: Date
}