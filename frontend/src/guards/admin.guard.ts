import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/auth.service';

/**
 * @description Activate if user has permission: ```admin```
 */
@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(
        private auth: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.auth.sessionInfo$
            .pipe(
                first(),
                map(s => {
                    if (!s.isAdmin) {
                        this.router.navigate(['/']);
                    }

                    return s.isAdmin;
                })
            );
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }
}
