import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fromProject } from '@store/projects/projects.selectors';
import { map, tap } from 'rxjs/operators';
import { ApiStatuses } from '@models/store';
import { ProjectsActions } from '@store/projects/projects.actions';

@Injectable({
  providedIn: 'root',
})
export class ProjectAccessGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const projectId = parseInt(route.paramMap.get('projectId') || '', 10);

    return this.store.select(fromProject.selectProjectsState).pipe(
      tap((state) => {
        if (state.status === ApiStatuses.NOT_LOADED) {
          this.store.dispatch(ProjectsActions.loadProjects());
        }
      }),
      filter((state) => state.status === ApiStatuses.LOADED),
      map((state) => {
        const project = state.projects.find(
          (project) => project.id === projectId
        );

        if (!project || isNaN(projectId)) {
          this.router.navigate(['/projects']);
          return false;
        }

        return true;
      })
    );
  }
}
