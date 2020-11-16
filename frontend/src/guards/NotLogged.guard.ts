import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "services/auth-service/Auth.service";

@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
    constructor(private auth: AuthService) {}
    
    canActivate(): boolean {
        return !this.auth.isLogged()
    }
}