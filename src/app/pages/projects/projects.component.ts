import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Observable } from 'rxjs';
import { Project } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'divine-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  joinProjectForm: FormGroup;

  joinErrorMessage$: Observable<string | null>;

  constructor(
    private projectsFacade: ProjectsFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.joinProjectForm = this.formBuilder.group({
      inviteToken: ['', [Validators.required]],
    });
  }

  ngOnInit() {
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
}
