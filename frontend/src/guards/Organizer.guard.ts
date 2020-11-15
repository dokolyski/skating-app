import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
    constructor(private cookie: CookieService) {}
    
    canActivate(): boolean {
        const canNavigate = this.cookie.check('is-organizer') && 
            this.cookie.get('is-organizer') as unknown as boolean == true
        
        return canNavigate
    }
}