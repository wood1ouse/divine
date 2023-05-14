import { createAction, props } from '@ngrx/store';
import { ProjectInvite } from '@models/database';

const loadProjectInvite = createAction('[ProjectInvites] Load Project Invite');

const loadProjectInviteSuccess = createAction(
  '[ProjectInvites] Load Project Invite Success',
  props<{ projectInvite: ProjectInvite }>()
);

const loadProjectInviteFailure = createAction(
  '[ProjectInvites] Load Project Invite Failure'
);

export const ProjectInviteActions = {
  loadProjectInvite,
  loadProjectInviteSuccess,
  loadProjectInviteFailure,
};
