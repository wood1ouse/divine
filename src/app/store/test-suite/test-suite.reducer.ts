import { createReducer, on } from '@ngrx/store';
import { TestSuiteActions } from './test-suite.actions';
import { ApiState, ApiStatuses } from '@models/store';
import { TestSuite } from '@models/database';

export const featureKey = 'testSuite';

export interface State extends ApiState {
  testSuites: TestSuite[];
  activeTestSuiteId: number | null;
  activeTestSuiteDeadline: string | null;
}

export const initialState: State = {
  testSuites: [],
  activeTestSuiteId: null,
  activeTestSuiteDeadline: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(
    TestSuiteActions.loadTestSuites,
    TestSuiteActions.loadTestSuiteDeadline,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TestSuiteActions.loadTestSuites,
    TestSuiteActions.loadTestSuiteDeadline,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TestSuiteActions.loadTestSuitesSuccess,
    (state, { testSuites }): State => ({
      ...state,
      testSuites,
      status: ApiStatuses.LOADED,
      error: null,
    })
  ),
  on(
    TestSuiteActions.loadTestSuiteDeadlineSuccess,
    (state, { deadline }): State => ({
      ...state,
      activeTestSuiteDeadline: deadline,
      status: ApiStatuses.LOADED,
      error: null,
    })
  ),
  on(
    TestSuiteActions.loadTestSuitesFailure,
    TestSuiteActions.loadTestSuiteDeadlineFailure,
    (state, { error }) => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(TestSuiteActions.setActiveTestSuite, (state, { testSuiteId }) => ({
    ...state,
    activeTestSuiteId: testSuiteId,
  }))
);
