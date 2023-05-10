import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Observable } from 'rxjs';
import { Project } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'divine-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    private projectsFacade: ProjectsFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectsFacade.dispatchLoadProjects();

    this.projects$ = this.projectsFacade.projects$;
  }

  setActiveProject(projectId: number) {
    this.projectsFacade.dispatchSetActiveProject(projectId);
    this.router.navigate([`./${projectId}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
