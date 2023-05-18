import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable, of } from 'rxjs';
import { TestCase } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { TestCaseCreateComponent } from '@pages/test-case-create/test-case-create.component';
import { TrelloFacade } from '@facades/trello.facade';
import { TrelloTestCase } from '@models/api';

@Component({
  selector: 'divine-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss'],
})
export class TestCasesComponent implements OnInit, OnDestroy {
  testCases$: Observable<TestCase[] | null>;

  trelloTestCases$: Observable<TrelloTestCase[] | null>;

  trelloTestCaseStatuses$: Observable<string[]>;

  trelloTestCaseBoards$: Observable<string[]>;

  subscribeToTrelloChanges = true;

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
    this.trelloTestCaseStatuses$ = this.trelloFacade.trelloTestCaseStatuses$;
    this.trelloTestCaseBoards$ = this.trelloFacade.trelloTestCaseBoards$;
    this.trelloTestCases$ = this.trelloFacade.trelloTestCases$;
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

  onTestingStatusChange(testingStatus: string) {
    this.trelloFacade.dispatchSetTestingStatusFilter(testingStatus);
  }

  onBoardChange(board: string) {
    this.trelloFacade.dispatchSetBoardFilter(board);
  }

  foo() {
    console.log('foo');
    this.subscribeToTrelloChanges = !this.subscribeToTrelloChanges;
    this.subscribeToTrelloChanges
      ? this.trelloFacade.dispatchSubscribeToCardListChanges()
      : this.trelloFacade.dispatchUnsubscribeToCardListChanges();
  }
}
