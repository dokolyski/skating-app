import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  readonly error = new EventEmitter<string>();  

  constructor(snackBar: MatSnackBar) {
    this.error.subscribe(e => snackBar.open(e, 'OK'));
  }
}
