import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

/**
 * @description Activate if user is online
 */
@Injectable({
    providedIn: 'root'
})
export class OnlineGuard implements CanActivate {
    constructor(private router: Router) {}

    static isOnline(): Observable<boolean> {
        const online = new BehaviorSubject<boolean>(navigator.onLine);
        fromEvent(window, 'online').subscribe(() => online.next(true));
        fromEvent(window, 'offline').subscribe(() => online.next(false));

        return online;
    }

    canActivate(): boolean {
        const online = navigator.onLine;
        if(!online) {
            this.router.navigate(['/']);
        }

        return online;
    }
}
