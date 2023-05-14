import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthReducer from '@store/auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

import * as fromProjectReducer from '@store/projects/projects.reducer';
import { ProjectsEffects } from '@store/projects/projects.effects';

import * as fromProjectInvitesReducer from '@store/project-invites/project-invites.reducer';
import { ProjectInvitesEffects } from '@store/project-invites/project-invites.effects';

import * as fromTrelloReducer from '@store/trello/trello.reducer';
import { TrelloEffects } from '@store/trello/trello.effects';

import * as fromTestSuiteReducer from '@store/test-suite/test-suite.reducer';
import { TestSuiteEffects } from '@store/test-suite/test-suite.effects';

import * as fromTestCaseReducer from '@store/test-case/test-case.reducer';
import { TestCaseEffects } from '@store/test-case/test-case.effects';

export interface AppState {
  [fromAuthReducer.featureKey]: fromAuthReducer.State;
  [fromProjectReducer.featureKey]: fromProjectReducer.State;
  [fromProjectInvitesReducer.featureKey]: fromProjectInvitesReducer.State;
  [fromTrelloReducer.featureKey]: fromTrelloReducer.State;
  [fromTestSuiteReducer.featureKey]: fromTestSuiteReducer.State;
  [fromTestCaseReducer.featureKey]: fromTestCaseReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuthReducer.featureKey]: fromAuthReducer.reducer,
  [fromProjectReducer.featureKey]: fromProjectReducer.reducer,
  [fromProjectInvitesReducer.featureKey]: fromProjectInvitesReducer.reducer,
  [fromTrelloReducer.featureKey]: fromTrelloReducer.reducer,
  [fromTestSuiteReducer.featureKey]: fromTestSuiteReducer.reducer,
  [fromTestCaseReducer.featureKey]: fromTestCaseReducer.reducer,
};

export const effects = [
  AuthEffects,
  ProjectsEffects,
  ProjectInvitesEffects,
  TrelloEffects,
  TestSuiteEffects,
  TestCaseEffects,
];
