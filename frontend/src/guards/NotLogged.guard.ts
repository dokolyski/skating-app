import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
        const destroy = new Subject();
        return this.auth.token$.pipe(
            takeUntil(destroy),
            map(token => {
                destroy.next();
                return !!token;
            })
        );
    }
}
