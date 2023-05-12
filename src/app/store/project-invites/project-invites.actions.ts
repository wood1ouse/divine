import { createAction, props } from '@ngrx/store';
import { ProjectInvite } from '@models/database';

const loadProjectInvites = createAction(
  '[ProjectInvites] Load Project Invites'
);

const loadProjectInvitesSuccess = createAction(
  '[ProjectInvites] Load Project Invites Success',
  props<{ projectInvites: ProjectInvite[] }>()
);

const loadProjectInvitesFailure = createAction(
  '[ProjectInvites] Load Project Invites Failure'
);

export const ProjectInvitesActions = {
  loadProjectInvites,
  loadProjectInvitesSuccess,
  loadProjectInvitesFailure,
};
