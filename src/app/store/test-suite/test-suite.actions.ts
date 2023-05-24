import { createAction, props } from '@ngrx/store';
import { TestSuite } from '@models/database';
import { PostgrestError } from '@supabase/supabase-js';

const loadTestSuites = createAction('[TestSuite] Load Test Suites');

const loadTestSuitesSuccess = createAction(
  '[TestSuite] Load Test Suites Success',
  props<{ testSuites: TestSuite[] }>()
);

const loadTestSuitesFailure = createAction(
  '[TestSuite] Load Test Suites Failure',
  props<{ error: PostgrestError }>()
);

const createTestSuite = createAction(
  '[TestSuite] Create Test Suite',
  props<{ name: string; description: string; deadline: string }>()
);

const createTestSuiteSuccess = createAction(
  '[TestSuite] Create Test Suite Success',
  props<{ testSuiteId: number }>()
);

const createTestSuiteFailure = createAction(
  '[TestSuite] Create Test Suite Failure',
  props<{ error: PostgrestError }>()
);

const setActiveTestSuite = createAction(
  '[TestSuite] Set Active Test Suite',
  props<{ testSuiteId: number }>()
);

const loadTestSuiteDeadline = createAction(
  '[TestSuite] Load Test Suite Deadline',
  props<{ testSuiteId: number }>()
);

const loadTestSuiteDeadlineSuccess = createAction(
  '[TestSuite] Load Test Suite Deadline Success',
  props<{ deadline: string | null }>()
);

const loadTestSuiteDeadlineFailure = createAction(
  '[TestSuite] Load Test Suite Deadline Failure',
  props<{ error: PostgrestError }>()
);

export const TestSuiteActions = {
  loadTestSuites,
  loadTestSuitesSuccess,
  loadTestSuitesFailure,
  createTestSuite,
  createTestSuiteSuccess,
  createTestSuiteFailure,
  setActiveTestSuite,
  loadTestSuiteDeadline,
  loadTestSuiteDeadlineSuccess,
  loadTestSuiteDeadlineFailure,
};
