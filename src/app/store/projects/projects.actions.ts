import { createAction, props } from '@ngrx/store';
import { Project } from '@models/database';
import { PostgrestError } from '@supabase/supabase-js';

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

const setActiveProject = createAction(
  '[Projects] Set Active Project',
  props<{ projectId: number }>()
);

const updateRemainingTime = createAction(
  '[Projects] Update Remaining Time',
  props<{ time: number }>()
);

const updateInviteToken = createAction('[Projects] Update Invite Token');

const updateInviteTokenSuccess = createAction(
  '[Projects] Update Invite Token Success'
);

const updateInviteTokenFailure = createAction(
  '[Projects] Update Invite Token Failure'
);

const subscribeToInviteToken = createAction(
  '[Projects] Subscribe To Invite Token'
);

const unsubscribeToInviteToken = createAction(
  '[Projects] Unsubscribe To Invite Token'
);

const joinProject = createAction(
  '[Projects] Join Project',
  props<{ inviteToken: string }>()
);

const joinProjectSuccess = createAction(
  '[Projects] Join Project Success',
  props<{ projectId: number }>()
);

const joinProjectFailure = createAction(
  '[Projects] Join Project Failure',
  props<{ error: PostgrestError }>()
);

export const ProjectsActions = {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFailure,
  createProject,
  createProjectSuccess,
  createProjectFailure,
  setActiveProject,
  updateRemainingTime,
  updateInviteToken,
  updateInviteTokenSuccess,
  updateInviteTokenFailure,
  subscribeToInviteToken,
  unsubscribeToInviteToken,
  joinProject,
  joinProjectSuccess,
  joinProjectFailure,
};
