import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "services/auth-service/Auth.service";

/**
 * @description Activate if user is logged else navigate to the main page
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    
    canActivate(): Observable<boolean> {
        return this.auth.token$.pipe(
            map(token => {
                if(token) {
                    return true
                } else {
                    this.router.navigate(['/'])
                    return false
                }
            })
        )
    }
}