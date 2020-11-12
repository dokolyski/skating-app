import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "services/AuthService";

@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
    constructor(private auth: AuthService) {}
    
    canActivate(): Observable<boolean> {
        return this.auth.user$
        .pipe(
            map(user => !user.isAnonymous)
        )
    }
}