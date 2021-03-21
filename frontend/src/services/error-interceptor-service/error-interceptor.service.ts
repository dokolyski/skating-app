import {EventEmitter, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  readonly error = new EventEmitter<{ message: string, status: number }>();

  constructor(snackBar: MatSnackBar,
              private translateService: TranslateService) {
    this.error.subscribe(e => {
      if (e.status === 401) {
        localStorage.removeItem('sessionInfo');
        this.translateService.get('success.logout').subscribe(message => snackBar.open(message));
      } else {
        snackBar.open(e.message, 'OK', {duration: 2000});
      }
    });
  }
}
