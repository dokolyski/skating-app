import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

/**
 * @description Activate if user is logged else navigate to the main page
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        const destroy = new Subject();
        return this.auth.token$.pipe(
            takeUntil(destroy),
            map(token => {
                destroy.next();
                if (token) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
}
