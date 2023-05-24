import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { tap, switchMap, startWith } from 'rxjs/operators';
import { TrelloFacade } from '@facades/trello.facade';
import { TestSuiteFacade } from '@facades/test-suite.facade';
import { TrelloTestCase } from '@models/api';

@Component({
  selector: 'divine-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  trelloTestCases$: Observable<TrelloTestCase[] | null>;

  deadlineDays: number;
  deadlineHours: number;
  deadlineMinutes: number;
  deadlineSeconds: number;

  deadline: string;

  private subscription: Subscription;

  constructor(
    private trelloFacade: TrelloFacade,
    private testSuiteFacade: TestSuiteFacade
  ) {}

  ngOnInit() {
    this.trelloTestCases$ = this.trelloFacade.trelloTestCases$;

    this.subscription = this.testSuiteFacade.testSuiteDeadline$
      .pipe(
        switchMap((deadline) =>
          interval(1000).pipe(
            startWith(0),
            tap(() => {
              if (deadline) {
                const countDownDate = new Date(deadline).getTime();
                const now = new Date().getTime();
                const distance = countDownDate - now;

                this.deadlineDays = Math.floor(
                  distance / (1000 * 60 * 60 * 24)
                );
                this.deadlineHours = Math.floor(
                  (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                this.deadlineMinutes = Math.floor(
                  (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                this.deadlineSeconds = Math.floor(
                  (distance % (1000 * 60)) / 1000
                );
              }

              console.log(this.deadline);

              this.deadline = `${this.deadlineDays} days ${this.deadlineHours} hours ${this.deadlineMinutes} minutes ${this.deadlineSeconds} seconds left`;
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
