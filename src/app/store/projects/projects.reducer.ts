import { createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';
import { ApiState, ApiStatuses } from '@models/store';
import { Project } from '@models/database';

export const featureKey = 'projects';

export interface State extends ApiState {
  projects: Project[];
}

export const initialState: State = {
  projects: [],
  status: ApiStatuses.NOT_LOADED,
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
  )
);
