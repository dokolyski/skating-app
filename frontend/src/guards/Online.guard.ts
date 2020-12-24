import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

/**
 * @description Activate if user is online
 */
@Injectable({
    providedIn: 'root'
})
export class OnlineGuard implements CanActivate {
    canActivate(): boolean {
        return navigator.onLine
    }
}