import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@supabase/supabase-js';

import { ApiState, ApiStatuses } from '@models/store';

export const featureKey = 'auth';

export interface State extends ApiState {
  user: User | null;
}

export const initialState: State = {
  user: null,
  status: ApiStatuses.NOT_LOADED,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.signIn,
    AuthActions.register,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
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
    })
  ),
  on(
    AuthActions.signOutSuccess,
    (state): State => ({ ...state, user: null, status: ApiStatuses.LOADED })
  )
);
