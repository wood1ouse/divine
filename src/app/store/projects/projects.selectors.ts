import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectsReducer from './projects.reducer';
import { fromAuth } from '@store/auth/auth.selectors';

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

const selectUserIsOwner = createSelector(
  fromAuth.selectUser,
  selectActiveProject,
  (user, activeProject) => {
    if (!activeProject || !user) return false;
    return user && user.id === activeProject.owner_id;
  }
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
  selectUserIsOwner,
  (state, userIsOwner) =>
    state.remainingInviteTime && userIsOwner ? state.remainingInviteTime : null
);

const selectTrackInviteToken = createSelector(
  selectProjectsState,
  (state) => state.trackInviteToken
);

export const fromProject = {
  selectProjectsState,
  selectProjects,
  selectActiveProject,
  selectJoinProjectErrorMessage,
  selectActiveProjectId,
  selectUserIsOwner,
  selectActiveProjectRemainingInviteTime,
  selectTrackInviteToken,
};
