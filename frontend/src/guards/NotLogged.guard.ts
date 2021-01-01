import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable  } from 'rxjs';
import { first, map  } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

/**
 * @description Activate if user is not logged
 */
@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    static isLogged(auth: AuthService): Observable<boolean> {
        return auth.token$.pipe(
            first(),
            map(token => !token)
        );
    }

    canActivate(): Observable<boolean> {
        return NotLoggedGuard.isLogged(this.auth)
        .pipe(
            map(notLogged => {
                if(notLogged) {
                    this.router.navigate(['/']);
                }

                return notLogged;
            })
        );
    }
}
