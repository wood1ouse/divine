import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import { TestCaseActions } from './test-case.actions';
import { ApiTestCaseService } from '../../api/api.test-case.service';
import { Store } from '@ngrx/store';
import { fromTestSuite } from '@store/test-suite/test-suite.selectors';
import { fromTestCase } from '@store/test-case/test-case.selectors';
import { Router } from '@angular/router';
import { fromProject } from '@store/projects/projects.selectors';

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
      concatMap(
        ([
          { title, description, status, trelloBoardId, trelloCardId },
          testSuiteId,
        ]) => {
          if (testSuiteId) {
            return from(
              this.apiTestCaseService.createTestCase(
                title,
                description,
                status,
                testSuiteId,
                trelloBoardId,
                trelloCardId
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
        }
      )
    );
  });

  updateTestCase$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestCaseActions.updateTestCase),
      withLatestFrom(this.store.select(fromTestCase.selectActiveTestCaseId)),
      concatMap(
        ([
          { title, description, status, trelloBoardId, trelloCardId },
          testCaseId,
        ]) => {
          if (testCaseId) {
            return from(
              this.apiTestCaseService.updateTestCase(
                title,
                description,
                status,
                testCaseId,
                trelloBoardId,
                trelloCardId
              )
            ).pipe(
              map(() => TestCaseActions.updateTestCaseSuccess()),
              catchError((error) => {
                return of(TestCaseActions.updateTestCaseFailure({ error }));
              })
            );
          } else {
            return EMPTY;
          }
        }
      )
    );
  });

  redirectToProjectsOnUpdateTestCaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestCaseActions.updateTestCaseSuccess),
        withLatestFrom(
          this.store.select(fromProject.selectActiveProjectId),
          this.store.select(fromTestSuite.selectActiveTestSuiteId)
        ),
        tap(([, projectId, testSuiteId]) => {
          this.router.navigate([
            `/projects/${projectId}/test-suites/${testSuiteId}/test-cases`,
          ]);
        })
      ),

    { dispatch: false }
  );

  refetchTestCasesOnCreateTestCaseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TestCaseActions.createTestCaseSuccess,
        TestCaseActions.setActiveTestCase
      ),
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
