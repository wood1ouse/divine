import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@facades/auth.facade';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { TrelloFacade } from '@facades/trello.facade';
import { ProjectsFacade } from '@facades/projects.facade';
import { TestSuiteFacade } from '@facades/test-suite.facade';
import { TestCaseFacade } from '@facades/test-case.facade';
import { NbMenuItem, NbPosition, NbTrigger } from '@nebular/theme';
import { ApiTestSuiteService } from './api/api.test-suite.service';

@Component({
  selector: 'divine-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userEmail$: Observable<string | null>;

  user$: Observable<User | null>;

  trelloUserName$: Observable<string | null>;

  projects: NbMenuItem[];

  testSuites: NbMenuItem[];

  title = 'divine';

  constructor(
    private authFacade: AuthFacade,
    private trelloFacade: TrelloFacade,
    private projectsFacade: ProjectsFacade,
    private testSuitesFacade: TestSuiteFacade,
    private testCasesFacade: TestCaseFacade,
    private apiTestSuiteService: ApiTestSuiteService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authFacade.dispatchInitAuthState();

    this.trelloFacade.dispatchCheckLinkWithTrello();
    this.trelloUserName$ = this.trelloFacade.trelloUserName$;

    this.userEmail$ = this.authFacade.userEmail$;
    this.user$ = this.authFacade.user$;

    this.projectsFacade.dispatchLoadProjects();

    // TODO: Move this to separate store

    this.projectsFacade.projects$.subscribe((projects) => {
      this.projects = projects.map((project) => ({
        title: project.name,
        url: `/projects/${project.id}`,
      }));
    });

    this.testSuites = (await this.apiTestSuiteService.getAllTestSuites()).map(
      (testSuite) => ({
        title: testSuite.name,
        url: `/projects/${testSuite.project_id}/test-suites/${testSuite.id}/test-cases`,
      })
    );
  }

  protected readonly NbPosition = NbPosition;
  protected readonly NbTrigger = NbTrigger;
}
