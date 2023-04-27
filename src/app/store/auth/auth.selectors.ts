import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';

const selectAuthState = createFeatureSelector<fromAuthReducer.State>(
  fromAuthReducer.featureKey
);

const selectUserEmail = createSelector(selectAuthState, (state) =>
  state.user && state.user.email ? state.user.email : null
);

export const fromAuth = {
  selectAuthState,
  selectUserEmail,
};
