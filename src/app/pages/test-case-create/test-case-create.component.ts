import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
import { MarkdownService } from 'ngx-markdown';
import { TestCaseFacade } from '@facades/test-case.facade';

@Component({
  selector: 'divine-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.scss'],
})
export class TestCaseCreateComponent implements OnInit {
  testCaseCreateForm: FormGroup;

  bsEditorInstance!: EditorInstance;

  editorOptions!: EditorOption;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private formBuilder: FormBuilder,
    private markdownService: MarkdownService
  ) {
    this.testCaseCreateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', Validators.required],
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
  }

  onTestCaseCreate() {
    if (this.testCaseCreateForm.valid) {
      this.testCaseFacade.dispatchCreateTestCase(
        this.testCaseCreateForm.value.title,
        this.testCaseCreateForm.value.description,
        this.testCaseCreateForm.value.status
      );
    }
  }

  highlight() {
    // eslint-disable-next-line angular/timeout-service
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.parse(inputValue.trim());
    this.highlight();

    return markedOutput;
  }
}
