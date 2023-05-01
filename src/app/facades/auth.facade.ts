import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthActions } from '@store/auth/auth.actions';
import { fromAuth } from '@store/auth/auth.selectors';
import { UserCredentials } from '@models/auth';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store) {}

  user$: Observable<User | null> = this.store.select(fromAuth.selectUser);

  userEmail$: Observable<string | null> = this.store.select(
    fromAuth.selectUserEmail
  );

  dispatchRegister(credentials: UserCredentials): void {
    this.store.dispatch(AuthActions.register(credentials));
  }

  dispatchLogin(credentials: UserCredentials): void {
    this.store.dispatch(AuthActions.signIn(credentials));
  }

  dispatchLogout(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  dispatchInitAuthState(): void {
    this.store.dispatch(AuthActions.initAuthState());
  }
}
