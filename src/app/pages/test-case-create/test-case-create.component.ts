import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
import { MarkdownService } from 'ngx-markdown';
import { TestCaseFacade } from '@facades/test-case.facade';
import { NbWindowRef } from '@nebular/theme';
import { TrelloFacade } from '@facades/trello.facade';
import { Observable } from 'rxjs';
import { CardListsNames, TrelloBoard, TrelloCard } from '@models/api';

@Component({
  selector: 'divine-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.scss'],
})
export class TestCaseCreateComponent implements OnInit {
  trelloBoards$: Observable<TrelloBoard[] | null>;

  trelloCards$: Observable<TrelloCard[] | null>;

  trelloCardList$: Observable<CardListsNames | null>;

  testCaseCreateForm: FormGroup;

  bsEditorInstance!: EditorInstance;

  editorOptions!: EditorOption;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private trelloFacade: TrelloFacade,
    private formBuilder: FormBuilder,
    private markdownService: MarkdownService,
    private nbWindowRef: NbWindowRef
  ) {
    this.testCaseCreateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', Validators.required],
      trelloCardId: [''],
      trelloBoardId: [''],
    });
  }

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => (this.bsEditorInstance = e),
      parser: (val) => this.parse(val),
    };

    this.trelloBoards$ = this.trelloFacade.trelloBoards$;
    this.trelloCards$ = this.trelloFacade.trelloCards$;
    this.trelloCardList$ = this.trelloFacade.trelloCardList$;
  }

  onTestCaseCreate() {
    if (this.testCaseCreateForm.valid) {
      this.testCaseFacade.dispatchCreateTestCase(
        this.testCaseCreateForm.value.title,
        this.testCaseCreateForm.value.description,
        this.testCaseCreateForm.value.status,
        this.testCaseCreateForm.value.trelloBoardId,
        this.testCaseCreateForm.value.trelloCardId
      );

      this.nbWindowRef.close();
    }
  }

  parse(inputValue: string) {
    return this.markdownService.parse(inputValue.trim());
  }

  onBoardChange(trelloBoardId: string) {
    this.trelloFacade.dispatchSetActiveTrelloBoard(trelloBoardId);
  }

  onCardChange(trelloCardId: string) {
    this.trelloFacade.dispatchSetActiveTrelloCard(trelloCardId);
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
