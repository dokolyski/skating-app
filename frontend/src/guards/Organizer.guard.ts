import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

/**
 * @description Activate if user has permission: ```organizer```
 */
@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
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
}
