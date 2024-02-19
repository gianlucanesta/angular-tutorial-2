import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable()
export class AuthEffects {
  API_KEY: string = 'AIzaSyDwfiOSXlrP__97Vqt-2F8gMsVuK8HPyJc';

  @Effect()
  authlogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            this.API_KEY,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData: any) => {
            const expirationDate = new Date(
              new Date().getTime() + resData.expiresIn * 1000
            );
            new AuthActions.Login({
              email: resData.email,
              userId: resData.userId,
              token: resData.token,
              expirationDate: resData.expirationDate,
            });
          }),
          catchError((error) => {
            return of();
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
function Effect(): (target: AuthEffects, propertyKey: 'authlogin') => void {
  throw new Error('Function not implemented.');
}
