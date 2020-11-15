import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class OnlineGuard implements CanActivate {
    canActivate(): boolean {
        return navigator.onLine
    }
}