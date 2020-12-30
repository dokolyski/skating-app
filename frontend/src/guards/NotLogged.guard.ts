import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
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
    constructor(private auth: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.auth.token$.pipe(
            first(),
            map(token => !token)
        );
    }
}
