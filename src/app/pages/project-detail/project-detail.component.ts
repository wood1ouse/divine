import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Project } from '@models/database';
import { Observable } from 'rxjs';

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

  constructor(private projectsFacade: ProjectsFacade) {}

  ngOnInit() {
    this.projectsFacade.dispatchSubscribeToInviteToken();

    this.project$ = this.projectsFacade.project$;
    this.inviteToken$ = this.projectsFacade.inviteToken$;
    this.inviteTokenRemainingTime$ = this.projectsFacade.remainingInviteTime$;
  }

  ngOnDestroy() {
    this.projectsFacade.dispatchUnsubscribeToInviteToken();
  }
}
