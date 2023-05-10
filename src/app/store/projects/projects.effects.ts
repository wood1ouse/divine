import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  tap,
  withLatestFrom,
  switchMap,
  mergeMap,
} from 'rxjs/operators';
import { EMPTY, filter, from, interval, of } from 'rxjs';
import { ProjectsActions } from './projects.actions';
import { ApiProjectsService } from '../../api/api.projects.service';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { fromProject } from '@store/projects/projects.selectors';

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
          map((response) => {
            const { error } = response;
            if (error) throw error;
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
      switchMap((isTracking) => {
        if (isTracking) {
          return interval(1000).pipe(
            withLatestFrom(
              this.store.select(
                fromProject.selectActiveProjectInviteTokenExpiration
              )
            ),
            switchMap(([_, expiration]) => {
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
      switchMap((isTracking) => {
        if (isTracking) {
          return interval(1000).pipe(
            withLatestFrom(
              this.store.select(
                fromProject.selectActiveProjectRemainingInviteTime
              ),
              this.store.select(fromProject.selectActiveProjectId)
            ),
            filter(([, , projectId]) => !!projectId),
            switchMap(([_, remainingTime, projectId]) => {
              if (remainingTime! <= 1000 && projectId) {
                return from(
                  this.apiProjectsService.updateInviteToken(projectId)
                ).pipe(
                  map(() => ProjectsActions.updateInviteTokenSuccess()),
                  catchError((error) => {
                    console.log(error);
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

  setActiveProjectFromRoute$ = createEffect(() =>
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.paramMap),
      map((params: ParamMap) => parseInt(params.get('projectId') || '', 10)),
      map((projectId) => ProjectsActions.setActiveProject({ projectId }))
    )
  );

  refetchProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateInviteTokenSuccess),
      map(() => {
        return ProjectsActions.loadProjects();
      })
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

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiProjectsService: ApiProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
