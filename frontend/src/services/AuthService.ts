import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(null);
  readonly user$ = this.user.asObservable().pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private afAuth: AngularFireAuth) {
    this.user.next(this.afAuth.authState);
  }

  registerViaEmail(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
  }

  loginViaEmail(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}