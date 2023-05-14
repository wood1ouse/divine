import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import { TestCaseActions } from './test-case.actions';
import { ApiTestCaseService } from '../../api/api.test-case.service';
import { Store } from '@ngrx/store';
import { fromTestSuite } from '@store/test-suite/test-suite.selectors';
import { Router } from '@angular/router';

@Injectable()
export class TestCaseEffects {
  loadTestCases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestCaseActions.loadTestCases),
      withLatestFrom(this.store.select(fromTestSuite.selectActiveTestSuiteId)),
      concatMap(([, testSuiteId]) => {
        if (testSuiteId) {
          return from(this.apiTestCaseService.getTestCases(testSuiteId)).pipe(
            map((testCases) =>
              TestCaseActions.loadTestCasesSuccess({ testCases })
            ),
            catchError((error) =>
              of(TestCaseActions.loadTestCasesFailure({ error }))
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  createTestSuite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestCaseActions.createTestCase),
      withLatestFrom(this.store.select(fromTestSuite.selectActiveTestSuiteId)),
      concatMap(([{ title, description, status }, testSuiteId]) => {
        if (testSuiteId) {
          return from(
            this.apiTestCaseService.createTestCase(
              title,
              description,
              status,
              testSuiteId
            )
          ).pipe(
            map((testCaseId) =>
              TestCaseActions.createTestCaseSuccess({ testCaseId })
            ),
            catchError((error) =>
              of(TestCaseActions.createTestCaseFailure({ error }))
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  refetchTestCasesOnCreateTestCaseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestCaseActions.createTestCaseSuccess),
      map(() => {
        return TestCaseActions.loadTestCases();
      })
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiTestCaseService: ApiTestCaseService,
    private router: Router
  ) {}
}
