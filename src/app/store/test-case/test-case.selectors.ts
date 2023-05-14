import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTestCaseReducer from './test-case.reducer';

const selectTestCaseState = createFeatureSelector<fromTestCaseReducer.State>(
  fromTestCaseReducer.featureKey
);

const selectTestCases = createSelector(
  selectTestCaseState,
  (state) => state.testCases
);

const selectActiveTestCase = createSelector(
  selectTestCaseState,
  selectTestCases,
  (state, testCases) => {
    const activeTestCase = testCases.find(
      (testCase) => testCase.id === state.activeTestCaseId
    );

    return activeTestCase ? activeTestCase : null;
  }
);

export const fromTestCase = {
  selectTestCaseState,
  selectTestCases,
  selectActiveTestCase,
};
