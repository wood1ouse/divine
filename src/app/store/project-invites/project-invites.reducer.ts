import { createReducer, on } from '@ngrx/store';
import { ProjectInviteActions } from './project-invites.actions';
import { ProjectInvite } from '@models/database';
import { ApiState, ApiStatuses } from '@models/store';

export const featureKey = 'projectInvites';

export interface State extends ApiState {
  projectInvite: ProjectInvite | null;
}

export const initialState: State = {
  projectInvite: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ProjectInviteActions.loadProjectInvite, (state) => ({
    ...state,
    status: ApiStatuses.LOADING,
  })),
  on(
    ProjectInviteActions.loadProjectInviteSuccess,
    (state, { projectInvite }) => ({
      ...state,
      projectInvite,
      status: ApiStatuses.LOADED,
    })
  ),
  on(ProjectInviteActions.loadProjectInviteFailure, (state) => ({
    ...state,
    status: ApiStatuses.NOT_LOADED,
  }))
);
