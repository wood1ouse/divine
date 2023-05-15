import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable } from 'rxjs';
import { TestCase } from '@models/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorOption } from 'angular-markdown-editor';
import { TrelloFacade } from '@facades/trello.facade';
import { CardListsNames, TrelloBoard, TrelloCard } from '@models/api';

@Component({
  selector: 'divine-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss'],
})
export class TestCaseDetailComponent implements OnInit, OnDestroy {
  testCase$: Observable<TestCase | null>;

  trelloBoards$: Observable<TrelloBoard[] | null>;

  trelloCards$: Observable<TrelloCard[] | null>;

  trelloCardList$: Observable<CardListsNames | null>;

  testCaseUpdateForm!: FormGroup;

  editorOptions!: EditorOption;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private trelloFacade: TrelloFacade,
    private formBuilder: FormBuilder,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.testCase$ = this.testCaseFacade.testCase$;

    this.testCase$.subscribe((testCase) => {
      if (testCase) {
        this.trelloFacade.dispatchSetActiveTrelloBoard(
          testCase.trello_board_id || ''
        );
        this.trelloFacade.dispatchSetActiveTrelloCard(
          testCase.trello_card_id || ''
        );

        this.testCaseUpdateForm = this.formBuilder.group({
          title: [testCase.title, [Validators.required]],
          description: [testCase.description, [Validators.required]],
          status: [testCase.status, Validators.required],
          trelloBoardId: [testCase.trello_board_id],
          trelloCardId: [testCase.trello_card_id],
        });
      }
    });

    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      parser: (val) => this.parse(val),
    };

    this.trelloFacade.dispatchSubscribeToCardListChanges();

    this.trelloBoards$ = this.trelloFacade.trelloBoards$;
    this.trelloCards$ = this.trelloFacade.trelloCards$;
    this.trelloCardList$ = this.trelloFacade.trelloCardList$;
  }

  ngOnDestroy() {
    this.trelloFacade.dispatchResetTrelloArtifacts();
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.parse(inputValue.trim());

    return markedOutput;
  }

  onBoardChange(trelloBoardId: string) {
    this.trelloFacade.dispatchSetActiveTrelloBoard(trelloBoardId);
  }

  onCardChange(trelloCardId: string) {
    this.trelloFacade.dispatchSetActiveTrelloCard(trelloCardId);
  }

  onTestCaseUpdate(): void {
    this.testCaseFacade.dispatchUpdateTestCase(
      this.testCaseUpdateForm.value.title,
      this.testCaseUpdateForm.value.description,
      this.testCaseUpdateForm.value.status,
      this.testCaseUpdateForm.value.trelloBoardId,
      this.testCaseUpdateForm.value.trelloCardId
    );
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
}
