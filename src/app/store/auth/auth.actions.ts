import { createAction, props } from '@ngrx/store';
import { User } from '@supabase/supabase-js';
import { UserCredentials } from 'app/models/auth';

const register = createAction('[Auth] Register', props<UserCredentials>());

const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

const signIn = createAction('[Auth] Sign In', props<UserCredentials>());

const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ user: User }>()
);

export const AuthActions = {
  register,
  registerSuccess,
  signIn,
  signInSuccess,
};
