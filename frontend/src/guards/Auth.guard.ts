import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

/**
 * @description Activate if user is logged else navigate to the main page
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.sessionInfo$.pipe(
            first(),
            map(token => {
                if (token) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }
}
