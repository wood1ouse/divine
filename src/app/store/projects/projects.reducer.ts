import { createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';
import { ApiState, ApiStatuses } from '@models/store';
import { Project } from '@models/database';

export const featureKey = 'projects';

export interface State extends ApiState {
  projects: Project[];
  activeProjectId: number | null;
  remainingInviteTime: number | null;
  trackInviteToken: boolean;
}

export const initialState: State = {
  projects: [],
  activeProjectId: null,
  remainingInviteTime: null,
  status: ApiStatuses.NOT_LOADED,
  trackInviteToken: false,
};

export const reducer = createReducer(
  initialState,
  on(
    ProjectsActions.loadProjects,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
    })
  ),
  on(
    ProjectsActions.loadProjectsSuccess,
    (state, { projects }): State => ({
      ...state,
      projects,
      status: ApiStatuses.LOADED,
    })
  ),
  on(
    ProjectsActions.loadProjectsFailure,
    (state): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
    })
  ),
  on(
    ProjectsActions.setActiveProject,
    (state, { projectId }): State => ({
      ...state,
      activeProjectId: projectId,
    })
  ),
  on(ProjectsActions.updateRemainingTime, (state, { time }) => ({
    ...state,
    remainingInviteTime: time,
  })),
  on(ProjectsActions.subscribeToInviteToken, (state) => ({
    ...state,
    trackInviteToken: true,
  })),
  on(ProjectsActions.unsubscribeToInviteToken, (state) => ({
    ...state,
    remainingInviteTime: null,
    trackInviteToken: false,
  }))
);
