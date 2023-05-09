import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { AuthActions } from './auth.actions';
import { ApiAuthService } from '../../api/api.auth.service';
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

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        of(this.authService.signOut()).pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error) => of({ type: '[Auth] Sign In Error', error }))
        )
      )
    )
  );

  initAuthState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.initAuthState),
      switchMap(async () => {
        const user = await this.authService.getUserFromLocalStorage();
        return AuthActions.setUser({ user });
      })
    );
  });

  redirectToDashboardOnSignInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  redirectToLoginOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  redirectToEmailConfirmOnRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/email-confirm']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: ApiAuthService,
    private router: Router
  ) {}
}
