import { createAction, props } from '@ngrx/store';
import { Project } from '@models/database';

const loadProjects = createAction('[Projects] Load Projects');

const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);

const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: Error }>()
);

const createProject = createAction(
  '[Projects] Create Project',
  props<{ name: string; description?: string }>()
);

const createProjectSuccess = createAction('[Projects] Create Project Success');

const createProjectFailure = createAction(
  '[Projects] Create Project Failure',
  props<{ error: Error }>()
);

export const ProjectsActions = {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFailure,
  createProject,
  createProjectSuccess,
  createProjectFailure,
};
