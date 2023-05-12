import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectInvitesReducer from './project-invites.reducer';

const selectProjectInvitesState =
  createFeatureSelector<fromProjectInvitesReducer.State>(
    fromProjectInvitesReducer.featureKey
  );

const selectProjectInvites = createSelector(
  selectProjectInvitesState,
  (state) => state.projectInvites
);

export const fromProjectInvites = {
  selectProjectInvitesState,
  selectProjectInvites,
};
