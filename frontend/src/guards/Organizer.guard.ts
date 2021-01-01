import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * @description Activate if user account type is ```organizer```
 */
@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
    constructor(private cookie: CookieService, private router: Router) {}

    canActivate(): boolean {
        const canNavigate = this.cookie.check('is-organizer') &&
            this.cookie.get('is-organizer') as unknown as boolean === true;

        if(!canNavigate) {
            this.router.navigate(['/']);
        }

        return canNavigate;
    }
}
