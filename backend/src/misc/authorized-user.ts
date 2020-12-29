import ForbiddenException from "./forbidden-exception";
import User from "../models/users";

class AuthorizedUser {
    private user: User = null;

    public setUser(user: User): void {
        this.user = user;
    }

    public checkOwnership(id: number) {
        if (this.user.id != id)
            throw new ForbiddenException()
    }
}

export default new AuthorizedUser();