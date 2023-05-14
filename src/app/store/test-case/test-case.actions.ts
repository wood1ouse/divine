import { createAction, props } from '@ngrx/store';
import { TestCase } from '@models/database';
import { PostgrestError } from '@supabase/supabase-js';

const loadTestCases = createAction('[TestCase] Load Test Cases');

const loadTestCasesSuccess = createAction(
  '[TestCase] Load Test Cases Success',
  props<{ testCases: TestCase[] }>()
);

const loadTestCasesFailure = createAction(
  '[TestCase] Load Test Cases Failure',
  props<{ error: PostgrestError }>()
);

const setActiveTestCase = createAction(
  '[TestSuite] Set Active Test Case',
  props<{ testCaseId: number }>()
);

const createTestCase = createAction(
  '[TestSuite] Create Case Suite',
  props<{ title: string; description: string; status: string }>()
);

const createTestCaseSuccess = createAction(
  '[TestSuite] Create Test Case Success',
  props<{ testCaseId: number }>()
);

const createTestCaseFailure = createAction(
  '[TestSuite] Create Test Case Failure',
  props<{ error: PostgrestError }>()
);

export const TestCaseActions = {
  loadTestCases,
  loadTestCasesSuccess,
  loadTestCasesFailure,
  setActiveTestCase,
  createTestCase,
  createTestCaseSuccess,
  createTestCaseFailure,
};
