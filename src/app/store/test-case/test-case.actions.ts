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
  props<{
    title: string;
    description: string;
    status: string;
    trelloBoardId?: string;
    trelloCardId?: string;
  }>()
);

const createTestCaseSuccess = createAction(
  '[TestSuite] Create Test Case Success',
  props<{ testCaseId: number }>()
);

const createTestCaseFailure = createAction(
  '[TestSuite] Create Test Case Failure',
  props<{ error: PostgrestError }>()
);

const updateTestCase = createAction(
  '[TestSuite] Update Case Suite',
  props<{
    title: string;
    description: string;
    status: string;
    trelloBoardId?: string;
    trelloCardId?: string;
  }>()
);

const updateTestCaseSuccess = createAction(
  '[TestSuite] Update Test Case Success'
);

const updateTestCaseFailure = createAction(
  '[TestSuite] Update Test Case Failure',
  props<{ error: PostgrestError }>()
);

const deleteTestCase = createAction('[TestSuite] Delete Test Case');

const deleteTestCaseSuccess = createAction(
  '[TestSuite] Delete Test Case Success'
);

const deleteTestCaseFailure = createAction(
  '[TestSuite] Delete Test Case Failure',
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
  updateTestCase,
  updateTestCaseSuccess,
  updateTestCaseFailure,
  deleteTestCase,
  deleteTestCaseSuccess,
  deleteTestCaseFailure,
};
