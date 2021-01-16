import {User} from "../users/user.entity";
import {ForbiddenException} from "@nestjs/common";
import {Profile} from "../profiles/profile.entity";

class AuthorizedUser {
    private user: User = null;
    private profile: Profile = null;

    public getId(): number {
        return this.user.id;
    }

    public setProfile(profile: Profile): void {
        this.profile = profile;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }

    public checkOwnership(userId: number): void {
        if (this.user.id != userId) {
            throw new ForbiddenException();

        }
    }

    public checkIsAdmin(): void {
        if (this.user.isAdmin || this.user.isHAdmin) {
            throw new ForbiddenException();
        }
    }

    public getFirstname(): string {
        return this.profile.firstname;
    }

    public getLastname(): string {
        return this.profile.lastname;
    }

    public getEmail(): string {
        return this.user.email;
    }
}

export default new AuthorizedUser();