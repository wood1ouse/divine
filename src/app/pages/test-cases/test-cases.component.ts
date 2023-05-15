import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable } from 'rxjs';
import { TestCase } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { TestCaseCreateComponent } from '@pages/test-case-create/test-case-create.component';
import { TrelloFacade } from '@facades/trello.facade';

@Component({
  selector: 'divine-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss'],
})
export class TestCasesComponent implements OnInit, OnDestroy {
  testCases$: Observable<TestCase[] | null>;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private trelloFacade: TrelloFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService
  ) {}

  ngOnInit() {
    this.testCaseFacade.dispatchLoadTestCases();
    this.trelloFacade.dispatchSubscribeToCardListChanges();

    this.testCases$ = this.testCaseFacade.testCases$;
  }

  ngOnDestroy() {
    this.trelloFacade.dispatchUnsubscribeToCardListChanges();
  }

  onTestCaseClick(testCaseId: number) {
    this.testCaseFacade.dispatchSetActiveTestCase(testCaseId);
    this.router.navigate([`./${testCaseId}`], {
      relativeTo: this.activatedRoute,
    });
  }

  openWindow() {
    this.windowService.open(TestCaseCreateComponent, {
      title: `Create New Test Case`,
    });
  }
}
