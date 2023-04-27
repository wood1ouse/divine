import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { AuthActions } from './auth.actions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password }) =>
        from(this.authService.register(email, password)).pipe(
          map((response) => {
            if (response.user) {
              return AuthActions.registerSuccess({ user: response.user });
            } else {
              throw Error();
            }
          }),
          catchError((error) => {
            return of({ type: '[Auth] Register Error', error });
          })
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ email, password }) =>
        from(this.authService.signIn(email, password)).pipe(
          map((response) => {
            if (response.user) {
              return AuthActions.signInSuccess({ user: response.user });
            } else {
              throw Error();
            }
          }),
          catchError((error) => {
            return of({ type: '[Auth] Sign In Error', error });
          })
        )
      )
    )
  );

  redirectToRootOnSignInOrRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess, AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
