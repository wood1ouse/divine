import { Component, OnInit } from '@angular/core';
import { TestSuiteFacade } from '@facades/test-suite.facade';
import { Observable } from 'rxjs';
import { TestSuite } from '@models/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'divine-test-suites',
  templateUrl: './test-suites.component.html',
  styleUrls: ['./test-suites.component.scss'],
})
export class TestSuitesComponent implements OnInit {
  testSuites$: Observable<TestSuite[] | null>;

  testSuiteCreateForm: FormGroup;

  constructor(
    private testSuitesFacade: TestSuiteFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.testSuiteCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadlineDay: ['', [Validators.required]],
      deadlineTime: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.testSuitesFacade.dispatchLoadTestSuites();

    this.testSuites$ = this.testSuitesFacade.testSuites$;
  }

  onTestSuiteCreate() {
    if (this.testSuiteCreateForm.valid) {
      const dateValue = this.testSuiteCreateForm.value.deadlineDay;
      const timeValue = this.testSuiteCreateForm.value.deadlineTime;

      const year = dateValue.getFullYear();
      const month = dateValue.getMonth();
      const date = dateValue.getDate();

      const hours = timeValue.getHours();
      const minutes = timeValue.getMinutes();
      const seconds = timeValue.getSeconds();

      const deadline = new Date(year, month, date, hours, minutes, seconds);
      this.testSuitesFacade.dispatchCreateTestSuite(
        this.testSuiteCreateForm.value.name,
        this.testSuiteCreateForm.value.description,
        deadline.toISOString()
      );
    }
  }

  onTestSuiteClick(testSuiteId: number): void {
    this.testSuitesFacade.dispatchSetActiveTestSuite(testSuiteId);
    this.router.navigate([`./${testSuiteId}/test-cases`], {
      relativeTo: this.activatedRoute,
    });
  }
}
