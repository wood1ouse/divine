import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  tap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { EMPTY, filter, from, interval, of } from 'rxjs';
import { ProjectsActions } from './projects.actions';
import { ApiProjectsService } from '../../api/api.projects.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromProject } from '@store/projects/projects.selectors';
import { ProjectInviteActions } from '@store/project-invites/project-invites.actions';
import { fromProjectInvite } from '@store/project-invites/project-invites.selectors';
import { TestSuiteActions } from '@store/test-suite/test-suite.actions';
import { TestCaseActions } from '@store/test-case/test-case.actions';

@Injectable()
export class ProjectsEffects {
  isTrackingInviteToken$ = this.store.select(
    fromProject.selectTrackInviteToken
  );

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      concatMap(() =>
        from(this.apiProjectsService.getProjects()).pipe(
          map((projects) => ProjectsActions.loadProjectsSuccess({ projects })),
          catchError((error) =>
            of(ProjectsActions.loadProjectsFailure({ error }))
          )
        )
      )
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      concatMap(({ name, description }) =>
        from(this.apiProjectsService.createProject(name, description)).pipe(
          map(() => {
            return ProjectsActions.createProjectSuccess();
          }),
          catchError((error) =>
            of(ProjectsActions.createProjectFailure({ error }))
          )
        )
      )
    );
  });

  updateRemainingTime$ = createEffect(() =>
    this.isTrackingInviteToken$.pipe(
      withLatestFrom(this.store.select(fromProject.selectUserIsOwner)),
      switchMap(([isTracking, userIsOwner]) => {
        if (isTracking && userIsOwner) {
          return interval(1000).pipe(
            withLatestFrom(
              this.store.select(
                fromProjectInvite.selectActiveProjectInviteTokenExpiration
              )
            ),
            switchMap(([, expiration]) => {
              if (!expiration) {
                return EMPTY;
              }

              const currentTime = Date.now();
              const expirationTime = new Date(expiration).getTime();
              const timeDifference = expirationTime - currentTime;

              return of(
                ProjectsActions.updateRemainingTime({
                  time: timeDifference,
                })
              );
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  checkInviteToken$ = createEffect(() =>
    this.isTrackingInviteToken$.pipe(
      withLatestFrom(this.store.select(fromProject.selectUserIsOwner)),
      switchMap(([isTracking, userIsOwner]) => {
        if (isTracking && userIsOwner) {
          return interval(1000).pipe(
            withLatestFrom(
              this.store.select(
                fromProject.selectActiveProjectRemainingInviteTime
              ),
              this.store.select(fromProject.selectActiveProjectId)
            ),
            concatMap(([, remainingTime, projectId]) => {
              if (remainingTime! <= 1000 && projectId) {
                return from(
                  this.apiProjectsService.updateInviteToken(projectId)
                ).pipe(
                  map(() => ProjectsActions.updateInviteTokenSuccess()),
                  catchError((error) => {
                    return of(ProjectsActions.updateInviteTokenFailure());
                  })
                );
              } else {
                return EMPTY;
              }
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  refetchProjectInviteOnUpdateTokenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateInviteTokenSuccess),
      map(() => {
        return ProjectInviteActions.loadProjectInvite();
      })
    )
  );

  activateProjectOnRouteChange$ = createEffect(() => {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      switchMap((route) => {
        const projectId = parseInt(route.snapshot.params['projectId']);
        const testSuiteId = parseInt(route.snapshot.params['testSuiteId']);
        const testCaseId = parseInt(route.snapshot.params['testCaseId']);

        return of(
          ProjectsActions.setActiveProject({
            projectId,
          }),
          TestSuiteActions.setActiveTestSuite({ testSuiteId }),
          TestCaseActions.setActiveTestCase({ testCaseId })
        );
      })
    );
  });

  refetchProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.joinProjectSuccess),
      map(() => {
        return ProjectsActions.loadProjects();
      })
    )
  );

  joinProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.joinProject),
      switchMap(({ inviteToken }) =>
        from(this.apiProjectsService.joinProject(inviteToken)).pipe(
          map((projectId) => ProjectsActions.joinProjectSuccess({ projectId })),
          catchError((error) => {
            return of(ProjectsActions.joinProjectFailure({ error }));
          })
        )
      )
    )
  );

  redirectToProjectsOnCreateProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.createProjectSuccess),
        tap(() => {
          this.router.navigate(['/projects']);
        })
      ),
    { dispatch: false }
  );

  redirectToProjectDetailOnJoinProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.joinProjectSuccess),
        tap(({ projectId }) => {
          this.router.navigate([`/projects/${projectId}`]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiProjectsService: ApiProjectsService,
    private router: Router
  ) {}
}
