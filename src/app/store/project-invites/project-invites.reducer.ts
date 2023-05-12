import { createReducer, on } from '@ngrx/store';
import { ProjectInvitesActions } from './project-invites.actions';
import { ProjectInvite } from '@models/database';
import { ApiState, ApiStatuses } from '@models/store';

export const featureKey = 'projectInvites';

export interface State extends ApiState {
  projectInvites: ProjectInvite[];
}

export const initialState: State = {
  projectInvites: [],
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ProjectInvitesActions.loadProjectInvites, (state) => ({
    ...state,
    status: ApiStatuses.LOADING,
  })),
  on(
    ProjectInvitesActions.loadProjectInvitesSuccess,
    (state, { projectInvites }) => ({
      ...state,
      projectInvites,
      status: ApiStatuses.LOADED,
    })
  ),
  on(ProjectInvitesActions.loadProjectInvitesFailure, (state) => ({
    ...state,
    status: ApiStatuses.NOT_LOADED,
  }))
);
