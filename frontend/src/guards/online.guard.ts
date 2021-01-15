import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * @description Activate if user is online
 */
@Injectable({
    providedIn: 'root'
})
export class OnlineGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}

    static isOnline(): Observable<boolean> {
        return new Observable(online => {
            online.next(navigator.onLine);

            const a = fromEvent(window, 'online')
            .subscribe(() => online.next(true));

            const b = fromEvent(window, 'offline')
            .subscribe(() => online.next(false));

            return () => {
                a.unsubscribe();
                b.unsubscribe();
            }
        });
    }

    canActivate(): boolean {
        const online = navigator.onLine;
        if(!online) {
            this.router.navigate(['/']);
        }

        return online;
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}
