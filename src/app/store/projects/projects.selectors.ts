import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectsReducer from './projects.reducer';

import { fromProjectInvites } from '@store/project-invites/project-invites.selectors';

const selectProjectsState = createFeatureSelector<fromProjectsReducer.State>(
  fromProjectsReducer.featureKey
);

const selectProjects = createSelector(
  selectProjectsState,
  (state) => state.projects
);

const selectActiveProject = createSelector(
  selectProjectsState,
  selectProjects,
  (state, projects) =>
    projects.find((project) => project.id === state.activeProjectId) || null
);

const selectActiveProjectId = createSelector(selectActiveProject, (project) =>
  project ? project.id : null
);

const selectActiveProjectInvite = createSelector(
  selectActiveProjectId,
  fromProjectInvites.selectProjectInvites,
  (activeProjectId, invites) =>
    invites.find((invite) => invite.project_id === activeProjectId)
);

const selectActiveProjectInviteToken = createSelector(
  selectActiveProjectInvite,
  (activeProjectInvite) =>
    activeProjectInvite ? activeProjectInvite.invite_token : null
);

const selectActiveProjectInviteTokenExpiration = createSelector(
  selectActiveProjectInvite,
  (activeProjectInvite) =>
    activeProjectInvite ? activeProjectInvite.invite_token_expiration : null
);

const selectJoinProjectErrorMessage = createSelector(
  selectProjectsState,
  (state) => {
    if (!state.error) return null;
    switch (state.error.code) {
      case '23505':
        return 'You are already participating this project';
      default:
        return 'No such project';
    }
  }
);

const selectActiveProjectRemainingInviteTime = createSelector(
  selectProjectsState,
  (state) => (state.remainingInviteTime ? state.remainingInviteTime : null)
);

const selectTrackInviteToken = createSelector(
  selectProjectsState,
  (state) => state.trackInviteToken
);

export const fromProject = {
  selectProjectsState,
  selectProjects,
  selectActiveProject,
  selectActiveProjectInvite,
  selectActiveProjectInviteToken,
  selectJoinProjectErrorMessage,
  selectActiveProjectInviteTokenExpiration,
  selectActiveProjectId,
  selectActiveProjectRemainingInviteTime,
  selectTrackInviteToken,
};
