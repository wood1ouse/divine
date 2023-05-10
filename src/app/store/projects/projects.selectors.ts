import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectsReducer from './projects.reducer';

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

const selectActiveProjectInviteTokenExpiration = createSelector(
  selectActiveProject,
  (project) =>
    project && project.invite_token_expiration
      ? project.invite_token_expiration
      : null
);

const selectActiveProjectId = createSelector(selectActiveProject, (project) =>
  project ? project.id : null
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
  selectActiveProjectInviteTokenExpiration,
  selectActiveProjectId,
  selectActiveProjectRemainingInviteTime,
  selectTrackInviteToken,
};
