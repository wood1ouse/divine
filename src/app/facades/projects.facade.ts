import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromProject } from '@store/projects/projects.selectors';
import { Project } from '@models/database';
import { ProjectsActions } from '@store/projects/projects.actions';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  constructor(private store: Store) {}

  projects$: Observable<Project[]> = this.store.select(
    fromProject.selectProjects
  );

  dispatchLoadProjects(): void {
    this.store.dispatch(ProjectsActions.loadProjects());
  }

  dispatchCreateProject(name: string, description?: string): void {
    this.store.dispatch(ProjectsActions.createProject({ name, description }));
  }
}
