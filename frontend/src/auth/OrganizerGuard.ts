import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
    constructor(private cookie: CookieService, private location: Location) {}
    
    canActivate(): boolean {
        const ok = this.cookie.check('is-organizer') && 
            this.cookie.get('is-organizer') as unknown as boolean == true
        
        if(ok) {
            return true
        } else {
            this.location.back()
            return false
        }
    }
}