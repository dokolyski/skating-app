import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/auth.service';

/**
 * @description Activate if user has permission: ```organizer```
 */
@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard implements CanActivate, CanActivateChild {
    constructor(
        private auth: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.auth.sessionInfo$
            .pipe(
                first(),
                map(s => {
                    if (!s.isOrganizer) {
                        this.router.navigate(['/']);
                    }

                    return s.isOrganizer;
                })
            );
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }
}
