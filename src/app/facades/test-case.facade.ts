import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { TestCase } from '@models/database';
import { fromTestCase } from '@store/test-case/test-case.selectors';
import { TestCaseActions } from '@store/test-case/test-case.actions';

@Injectable({
  providedIn: 'root',
})
export class TestCaseFacade {
  constructor(private store: Store) {}

  testCases$: Observable<TestCase[] | null> = this.store.select(
    fromTestCase.selectTestCases
  );

  testCase$: Observable<TestCase | null> = this.store.select(
    fromTestCase.selectActiveTestCase
  );

  dispatchLoadTestCases(): void {
    this.store.dispatch(TestCaseActions.loadTestCases());
  }

  dispatchSetActiveTestCase(testCaseId: number): void {
    this.store.dispatch(TestCaseActions.setActiveTestCase({ testCaseId }));
  }

  dispatchCreateTestCase(
    title: string,
    description: string,
    status: string,
    trelloBoardId?: string,
    trelloCardId?: string
  ): void {
    this.store.dispatch(
      TestCaseActions.createTestCase({
        title,
        description,
        status,
        trelloBoardId,
        trelloCardId,
      })
    );
  }

  dispatchUpdateTestCase(
    title: string,
    description: string,
    status: string,
    trelloBoardId?: string,
    trelloCardId?: string
  ): void {
    this.store.dispatch(
      TestCaseActions.updateTestCase({
        title,
        description,
        status,
        trelloBoardId,
        trelloCardId,
      })
    );
  }
}
