import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { of, from, EMPTY, filter } from 'rxjs';
import { TestSuiteActions } from './test-suite.actions';
import { fromProject } from '@store/projects/projects.selectors';
import { Store } from '@ngrx/store';
import { ApiTestSuiteService } from '../../api/api.test-suite.service';
import { Router } from '@angular/router';

@Injectable()
export class TestSuiteEffects {
  loadTestSuites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestSuiteActions.loadTestSuites),
      withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
      concatMap(([, projectId]) => {
        console.log(projectId);
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

  createTestSuite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TestSuiteActions.createTestSuite),
      withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
      concatMap(([{ name, description }, projectId]) => {
        if (projectId) {
          return from(
            this.apiTestSuitesService.createTestSuite(
              projectId,
              name,
              description
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

  refetchTestSuitesOnCreateTestSuiteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestSuiteActions.createTestSuiteSuccess),
      map(() => {
        return TestSuiteActions.loadTestSuites();
      })
    )
  );

  redirectToTestSuiteDetailOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestSuiteActions.createTestSuiteSuccess),
        withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
        tap(([{ testSuiteId }, projectId]) => {
          this.router.navigate([
            `/projects/${projectId}/test-suites/${testSuiteId}`,
          ]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiTestSuitesService: ApiTestSuiteService,
    private router: Router
  ) {}
}
