import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@supabase/supabase-js';

import { ApiState, ApiStatuses } from '@models/store';

export const featureKey = 'auth';

export interface State extends ApiState {
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  user: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
  errorMessage: null,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.signIn,
    AuthActions.register,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),

  on(
    AuthActions.signInSuccess,
    AuthActions.registerSuccess,
    AuthActions.setUser,
    (state, { user }): State => ({
      ...state,
      user,
      status: ApiStatuses.LOADED,
      error: null,
    })
  ),
  on(
    AuthActions.signOutSuccess,
    (state): State => ({
      ...state,
      user: null,
      status: ApiStatuses.LOADED,
      error: null,
    })
  ),
  on(
    AuthActions.signInFailure,
    (state, { errorMessage }): State => ({
      ...state,
      user: null,
      status: ApiStatuses.NOT_LOADED,
      errorMessage,
    })
  )
);
