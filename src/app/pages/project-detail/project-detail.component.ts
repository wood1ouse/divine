import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Project } from '@models/database';
import { Observable } from 'rxjs';
import { ProjectInviteFacade } from '@facades/project-invite.facade';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'divine-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project$: Observable<Project | null>;

  inviteToken$: Observable<string | null>;

  inviteTokenRemainingTime$: Observable<number | null>;

  constructor(
    private projectsFacade: ProjectsFacade,
    private projectInviteFacade: ProjectInviteFacade
  ) {}

  ngOnInit() {
    this.projectsFacade.dispatchSubscribeToInviteToken();
    this.projectInviteFacade.dispatchLoadProjectInvite();

    this.project$ = this.projectsFacade.project$;
    this.inviteToken$ = this.projectInviteFacade.projectInviteToken$;
    this.inviteTokenRemainingTime$ = this.projectsFacade.remainingInviteTime$;
  }

  ngOnDestroy() {
    this.projectsFacade.dispatchUnsubscribeToInviteToken();
  }
}
