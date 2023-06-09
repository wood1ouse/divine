import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromTestSuite } from '@store/test-suite/test-suite.selectors';
import { TestSuite } from '@models/database';
import { TestSuiteActions } from '@store/test-suite/test-suite.actions';

@Injectable({
  providedIn: 'root',
})
export class TestSuiteFacade {
  constructor(private store: Store) {}

  testSuites$: Observable<TestSuite[] | null> = this.store.select(
    fromTestSuite.selectTestSuites
  );

  testSuiteDeadline$: Observable<string | null> = this.store.select(
    fromTestSuite.selectActiveTestSuiteDeadline
  );

  dispatchLoadTestSuites(): void {
    this.store.dispatch(TestSuiteActions.loadTestSuites());
  }

  dispatchCreateTestSuite(
    name: string,
    description: string,
    deadline: string
  ): void {
    this.store.dispatch(
      TestSuiteActions.createTestSuite({ name, description, deadline })
    );
  }

  dispatchSetActiveTestSuite(testSuiteId: number): void {
    this.store.dispatch(TestSuiteActions.setActiveTestSuite({ testSuiteId }));
  }
}
