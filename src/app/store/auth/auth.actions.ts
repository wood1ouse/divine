import { createAction, props } from '@ngrx/store';
import { User } from '@supabase/supabase-js';
import { UserCredentials } from 'app/models/auth';

const register = createAction('[Auth] Register', props<UserCredentials>());

const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User | null }>()
);

const signIn = createAction('[Auth] Sign In', props<UserCredentials>());

const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ user: User | null }>()
);

const initAuthState = createAction('[Auth] Init Auth State');

const setUser = createAction('[Auth] Set User', props<{ user: User | null }>());

const signOut = createAction('[Auth] Log Out');

const signOutSuccess = createAction('[Auth] Log Out Success');

export const AuthActions = {
  register,
  registerSuccess,
  signIn,
  signInSuccess,
  initAuthState,
  setUser,
  signOut,
  signOutSuccess,
};
