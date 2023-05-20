import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable } from 'rxjs';
import { TestCase } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService, NbWindowState } from '@nebular/theme';
import { TestCaseCreateComponent } from '@pages/test-case-create/test-case-create.component';
import { TrelloFacade } from '@facades/trello.facade';
import { CardListsNames, TrelloTestCase } from '@models/api';
import { StatisticsComponent } from '@pages/statistics/statistics.component';

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

  boardFilter: string | null;

  statusFilter: string | null;

  displayedColumns: string[] = [
    'title',
    'trelloBoard',
    'trelloCard',
    'status',
    'trelloList',
  ];

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

    this.trelloFacade.boardFilter$.subscribe((value) => {
      this.boardFilter = value;
    });
    this.trelloFacade.statusFilter$.subscribe((value) => {
      this.statusFilter = value;
    });
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

  onFiltersReset() {
    this.trelloFacade.dispatchResetActiveFilters();
  }

  getListName(trelloCardList: CardListsNames): string {
    switch (trelloCardList) {
      case CardListsNames.NOT_STARTED:
        return 'basic';
      case CardListsNames.IN_PROGRESS:
        return 'primary';
      case CardListsNames.CODE_REVIEW:
        return 'warning';
      case CardListsNames.DONE:
        return 'success';
      default:
        return '';
    }
  }

  onStatisticsClick() {
    this.windowService.open(StatisticsComponent, {
      title: 'Test Suite Statistics',
      initialState: NbWindowState.MAXIMIZED,
    });
  }
}
