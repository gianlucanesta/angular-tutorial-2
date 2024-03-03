import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../components/store/app.reducer';

import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  private tokenExpirationTimer: any;

  API_KEY: string = 'AIzaSyDwfiOSXlrP__97Vqt-2F8gMsVuK8HPyJc';

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
