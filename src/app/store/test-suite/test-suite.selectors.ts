import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTestSuiteReducer from './test-suite.reducer';

const selectTestSuiteState = createFeatureSelector<fromTestSuiteReducer.State>(
  fromTestSuiteReducer.featureKey
);

const selectTestSuites = createSelector(
  selectTestSuiteState,
  (state) => state.testSuites
);

const selectActiveTestSuiteId = createSelector(
  selectTestSuiteState,
  (state) => state.activeTestSuiteId
);

const selectActiveTestSuiteDeadline = createSelector(
  selectTestSuiteState,
  (state) => state.activeTestSuiteDeadline
);

export const fromTestSuite = {
  selectTestSuiteState,
  selectTestSuites,
  selectActiveTestSuiteId,
  selectActiveTestSuiteDeadline,
};
