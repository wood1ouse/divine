import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';
import { ApiStatuses } from '@models/store';

const selectAuthState = createFeatureSelector<fromAuthReducer.State>(
  fromAuthReducer.featureKey
);

const selectUser = createSelector(selectAuthState, (state) => state.user);

const selectUserEmail = createSelector(selectUser, (user) =>
  user && user.email ? user.email : null
);

const selectUserIsLoaded = createSelector(
  selectAuthState,
  (state) => state.status === ApiStatuses.LOADED
);

const selectAuthErrorMessage = createSelector(
  selectAuthState,
  (state) => state.errorMessage
);

export const fromAuth = {
  selectAuthState,
  selectUser,
  selectUserEmail,
  selectUserIsLoaded,
  selectAuthErrorMessage,
};
