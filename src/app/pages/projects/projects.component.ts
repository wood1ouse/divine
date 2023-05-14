import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Observable } from 'rxjs';
import { Project } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TrelloFacade } from '@facades/trello.facade';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'divine-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  joinProjectForm: FormGroup;

  linkWithTrelloForm: FormGroup;

  joinErrorMessage$: Observable<string | null>;

  constructor(
    private projectsFacade: ProjectsFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private trelloFacade: TrelloFacade
  ) {
    this.joinProjectForm = this.formBuilder.group({
      inviteToken: ['', [Validators.required]],
    });
    this.linkWithTrelloForm = this.formBuilder.group({
      apiKey: ['', [Validators.required]],
      token: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.projectsFacade.dispatchLoadProjects();

    this.projects$ = this.projectsFacade.projects$;
    this.joinErrorMessage$ = this.projectsFacade.joinErrorMessage$;
  }

  setActiveProject(projectId: number) {
    this.projectsFacade.dispatchSetActiveProject(projectId);
    this.router.navigate([`./${projectId}`], {
      relativeTo: this.activatedRoute,
    });
  }

  onSubmit() {
    if (this.joinProjectForm.valid) {
      const inviteToken = this.joinProjectForm.value.inviteToken;
      this.projectsFacade.dispatchJoinProject(inviteToken);
    }
  }

  onTrelloLink() {
    if (this.linkWithTrelloForm.valid) {
      this.trelloFacade.dispatchLinkWithTrello(
        this.linkWithTrelloForm.value.apiKey,
        this.linkWithTrelloForm.value.token
      );
    }
  }
}
