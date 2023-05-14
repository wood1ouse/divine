import { createReducer, on } from '@ngrx/store';
import { TestCaseActions } from './test-case.actions';
import { ApiState, ApiStatuses } from '@models/store';
import { TestCase } from '@models/database';

export const featureKey = 'testCase';

export interface State extends ApiState {
  testCases: TestCase[];
  activeTestCaseId: number | null;
}

export const initialState: State = {
  testCases: [],
  activeTestCaseId: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TestCaseActions.loadTestCases, (state) => ({
    ...state,
    status: ApiStatuses.LOADING,
    error: null,
  })),
  on(TestCaseActions.loadTestCasesSuccess, (state, { testCases }) => ({
    ...state,
    testCases,
    status: ApiStatuses.LOADED,
    error: null,
  })),
  on(TestCaseActions.loadTestCasesFailure, (state, { error }) => ({
    ...state,
    status: ApiStatuses.NOT_LOADED,
    error,
  })),
  on(TestCaseActions.setActiveTestCase, (state, { testCaseId }) => ({
    ...state,
    activeTestCaseId: testCaseId,
  }))
);
