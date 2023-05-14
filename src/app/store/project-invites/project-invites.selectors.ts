import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectInvitesReducer from './project-invites.reducer';
import { fromProject } from '@store/projects/projects.selectors';

const selectProjectInvitesState =
  createFeatureSelector<fromProjectInvitesReducer.State>(
    fromProjectInvitesReducer.featureKey
  );

const selectProjectInvite = createSelector(
  selectProjectInvitesState,
  (state) => state.projectInvite
);

const selectActiveProjectInviteToken = createSelector(
  selectProjectInvite,
  fromProject.selectUserIsOwner,
  (activeProjectInvite, userIsOwner) =>
    activeProjectInvite && userIsOwner ? activeProjectInvite.invite_token : null
);

const selectActiveProjectInviteTokenExpiration = createSelector(
  selectProjectInvite,
  (activeProjectInvite) =>
    activeProjectInvite ? activeProjectInvite.invite_token_expiration : null
);

export const fromProjectInvite = {
  selectProjectInvitesState,
  selectProjectInvite,
  selectActiveProjectInviteToken,
  selectActiveProjectInviteTokenExpiration,
};
