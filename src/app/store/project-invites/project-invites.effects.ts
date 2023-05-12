import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ProjectInvitesActions } from './project-invites.actions';
import { ProjectsActions } from '@store/projects/projects.actions';
import { ApiProjectsService } from '../../api/api.projects.service';

@Injectable()
export class ProjectInvitesEffects {
  getProjectInviteLoadProjectsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjectsSuccess),
      map(() => {
        // INSERT
        return ProjectInvitesActions.loadProjectInvites();
      })
    )
  );

  loadProjectInvites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectInvitesActions.loadProjectInvites),
      concatMap(() =>
        from(this.apiProjectsService.getProjectInvites()).pipe(
          map(({ data }) =>
            ProjectInvitesActions.loadProjectInvitesSuccess({
              projectInvites: data || [],
            })
          ),
          catchError(() =>
            of(ProjectInvitesActions.loadProjectInvitesFailure())
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private apiProjectsService: ApiProjectsService
  ) {}
}
