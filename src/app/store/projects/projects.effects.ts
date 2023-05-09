import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ProjectsActions } from './projects.actions';
import { ApiProjectsService } from '../../api/api.projects.service';
import { Router } from '@angular/router';

@Injectable()
export class ProjectsEffects {
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
    private actions$: Actions,
    private apiProjectsService: ApiProjectsService,
    private router: Router
  ) {}
}
