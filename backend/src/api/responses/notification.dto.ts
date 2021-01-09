export class NotificationResponse {

    id: number
    user_id: number
    session_id: number
    show_date: Date
    expiration_date: Date
    status: string
    title: string
    description: string

    owner: {
        firstname: string,
        lastname: string,
        email: string
    }

    // createdAt: Date
    // updatedAt: Date
}