import ForbiddenException from "./forbidden-exception";
import User from "../models/users";

class AuthorizedUser {
    private user: User = null;

    public setUser(user: User): void {
        this.user = user;
    }

    public checkOwnership(userId: number) {
        if (this.user.id != userId)
            throw new ForbiddenException()
    }
}

export default new AuthorizedUser();