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

    public checkOwnership(userId: number): void {
        if (this.user.id != userId) {
            throw new ForbiddenException();

        }
    }

    public checkIsAdmin(): void {
        if (this.user.account_type != "ADMIN") {
            throw new ForbiddenException();
        }
    }
}

export default new AuthorizedUser();