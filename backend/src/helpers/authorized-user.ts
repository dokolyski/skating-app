import {User} from "../users/user.entity";
import {ForbiddenException} from "@nestjs/common";

class AuthorizedUser {
    private user: User = null;

    public getId(): number {
        return this.user.id;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public checkOwnership(userId: number) {
        if (this.user.id != userId)
            throw new ForbiddenException()
    }
}

export default new AuthorizedUser();