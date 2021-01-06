import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable  } from 'rxjs';
import { first, map, tap  } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

/**
 * @description Activate if user is not logged
 */
@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.sessionInfo$
        .pipe(
            first(),
            map(token => {
                const isNotLogged = token == null;
                if(!isNotLogged) {
                    this.router.navigate(['/']);
                }

                return isNotLogged;
            })
        );
    }
}
