import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@supabase/supabase-js';

export const featureKey = 'auth'

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.registerSuccess,
    AuthActions.signInSuccess,
    (state, { user }) => ({ ...state, user })
  )
);
