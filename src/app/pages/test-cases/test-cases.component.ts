import { Component, OnInit } from '@angular/core';
import { TestCaseFacade } from '@facades/test-case.facade';
import { Observable } from 'rxjs';
import { TestCase } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { TestCaseCreateComponent } from '@pages/test-case-create/test-case-create.component';

@Component({
  selector: 'divine-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss'],
})
export class TestCasesComponent implements OnInit {
  testCases$: Observable<TestCase[] | null>;

  constructor(
    private testCaseFacade: TestCaseFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService
  ) {}

  ngOnInit() {
    this.testCaseFacade.dispatchLoadTestCases();

    this.testCases$ = this.testCaseFacade.testCases$;
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
