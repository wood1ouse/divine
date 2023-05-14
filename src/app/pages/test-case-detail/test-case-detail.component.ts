import { Component, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable } from 'rxjs';
import { TestCase } from '@models/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorOption } from 'angular-markdown-editor';

@Component({
  selector: 'divine-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss'],
})
export class TestCaseDetailComponent implements OnInit {
  testCase$: Observable<TestCase | null>;

  testCaseUpdateForm!: FormGroup;

  editorOptions!: EditorOption;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private formBuilder: FormBuilder,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.testCase$ = this.testCaseFacade.testCase$;

    this.testCase$.subscribe((testCase) => {
      if (testCase) {
        this.testCaseUpdateForm = this.formBuilder.group({
          title: [testCase.title, [Validators.required]],
          description: [testCase.description, [Validators.required]],
          status: [testCase.status, Validators.required],
        });
      }
    });

    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      parser: (val) => this.parse(val),
    };
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.parse(inputValue.trim());

    return markedOutput;
  }

  onTestCaseUpdate(): void {
    console.log();
  }
}
