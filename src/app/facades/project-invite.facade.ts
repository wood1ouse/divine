import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromProjectInvite } from '@store/project-invites/project-invites.selectors';
import { ProjectInviteActions } from '@store/project-invites/project-invites.actions';

@Injectable({
  providedIn: 'root',
})
export class ProjectInviteFacade {
  constructor(private store: Store) {}

  projectInviteToken$: Observable<string | null> = this.store.select(
    fromProjectInvite.selectActiveProjectInviteToken
  );

  dispatchLoadProjectInvite(): void {
    this.store.dispatch(ProjectInviteActions.loadProjectInvite());
  }
}
