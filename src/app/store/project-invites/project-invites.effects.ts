import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { of, from, EMPTY } from 'rxjs';
import { ProjectInviteActions } from './project-invites.actions';
import { ApiProjectsService } from '../../api/api.projects.service';
import { Store } from '@ngrx/store';
import { fromProject } from '@store/projects/projects.selectors';

@Injectable()
export class ProjectInvitesEffects {
  loadProjectInvite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectInviteActions.loadProjectInvite),
      withLatestFrom(this.store.select(fromProject.selectActiveProjectId)),
      concatMap(([, projectId]) => {
        if (projectId) {
          return from(this.apiProjectsService.getProjectInvite(projectId)).pipe(
            map((projectInvite) =>
              ProjectInviteActions.loadProjectInviteSuccess({
                projectInvite,
              })
            ),
            catchError(() =>
              of(ProjectInviteActions.loadProjectInviteFailure())
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiProjectsService: ApiProjectsService
  ) {}
}
