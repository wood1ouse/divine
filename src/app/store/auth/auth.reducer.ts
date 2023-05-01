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
    AuthActions.signInSuccess,
    AuthActions.setUser,
    (state, { user }): State => ({
      ...state,
      user,
      status: ApiStatuses.LOADED,
    })
  ),
  on(AuthActions.signOutSuccess, (state): State => ({ ...state, user: null }))
);
