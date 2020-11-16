import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'services/rest-service/Rest.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private rest: RestService) {}

  registerViaEmail(email: string, password: string): Observable<void> {
    return new Observable<void>()
  }

  loginViaEmail(email: string, password: string): Observable<void> {
    return new Observable<void>()
  }

  loginViaGoogle(): Observable<void> {
    return new Observable<void>()
  }

  logout(): Observable<void> {
    return new Observable<void>()
  }

  isLogged(): boolean {
    return true
  }
}