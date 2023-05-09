import { Component, OnInit } from '@angular/core';
import { ProjectsFacade } from '@facades/projects.facade';
import { Observable } from 'rxjs';
import { Project } from '@models/database';

@Component({
  selector: 'divine-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(private projectsFacade: ProjectsFacade) {}

  ngOnInit() {
    this.projectsFacade.dispatchLoadProjects();

    this.projects$ = this.projectsFacade.projects$;
  }
}
