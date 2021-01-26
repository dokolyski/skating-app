import {EventEmitter, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  readonly error = new EventEmitter<{ message: string, status: number }>();

  constructor(snackBar: MatSnackBar) {
    this.error.subscribe(e => {
      if (e.status === 401) {
        localStorage.removeItem('sessionInfo');
      }
      snackBar.open(e.message, 'OK');
    });
  }
}
