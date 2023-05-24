import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { of, from, EMPTY } from 'rxjs';
import { TestSuiteActions } from './test-suite.actions';
import { fromProject } from '@store/projects/projects.selectors';
import { Store } from '@ngrx/store';
import { ApiTestSuiteService } from '../../api/api.test-suite.service';
import { fromTestSuite } from '@store/test-suite/test-suite.selectors';

@Injectable()
export class TestSuiteEffects {
  loadTestSuites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestSuiteActions.loadTestSuites),
      withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
      concatMap(([, projectId]) => {
        if (projectId) {
          return from(this.apiTestSuitesService.getTestSuites(projectId)).pipe(
            map((testSuites) =>
              TestSuiteActions.loadTestSuitesSuccess({ testSuites })
            ),
            catchError((error) =>
              of(TestSuiteActions.loadTestSuitesFailure({ error }))
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  loadTestSuiteDeadline$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestSuiteActions.loadTestSuiteDeadline),
      withLatestFrom(this.store.select(fromTestSuite.selectActiveTestSuiteId)),
      concatMap(([, testSuiteId]) => {
        if (testSuiteId) {
          return from(
            this.apiTestSuitesService.getTestSuiteDeadline(testSuiteId)
          ).pipe(
            map(([{ deadline }]) =>
              TestSuiteActions.loadTestSuiteDeadlineSuccess({ deadline })
            ),
            catchError((error) =>
              of(TestSuiteActions.loadTestSuiteDeadlineFailure({ error }))
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
      ofType(TestSuiteActions.createTestSuite),
      withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
      concatMap(([{ name, description, deadline }, projectId]) => {
        if (projectId) {
          return from(
            this.apiTestSuitesService.createTestSuite(
              projectId,
              name,
              description,
              deadline
            )
          ).pipe(
            map((testSuiteId) =>
              TestSuiteActions.createTestSuiteSuccess({ testSuiteId })
            ),
            catchError((error) =>
              of(TestSuiteActions.createTestSuiteFailure({ error }))
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  loadTestSuiteDeadlineOnSetActiveTestSuite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestSuiteActions.setActiveTestSuite),
      map(({ testSuiteId }) => {
        return TestSuiteActions.loadTestSuiteDeadline({ testSuiteId });
      })
    )
  );

  refetchTestSuitesOnCreateTestSuiteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestSuiteActions.createTestSuiteSuccess),
      map(() => {
        return TestSuiteActions.loadTestSuites();
      })
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiTestSuitesService: ApiTestSuiteService
  ) {}
}
