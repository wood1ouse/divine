import { Component, OnInit } from '@angular/core';
import { TrelloFacade } from '@facades/trello.facade';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { distinctUntilChanged, Observable } from 'rxjs';
import { TrelloTestCase } from '@models/api';
import { map } from 'rxjs/operators';

import { isEqual } from 'lodash';

@Component({
  selector: 'divine-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'>;
  doughnutChartType: ChartType = 'pie';

  trelloTestCases$: Observable<TrelloTestCase[] | null>;

  doughnutChartOptions: ChartOptions = {};

  constructor(private trelloFacade: TrelloFacade) {}

  ngOnInit() {
    this.trelloTestCases$ = this.trelloFacade.trelloTestCases$;

    this.trelloTestCases$
      .pipe(
        distinctUntilChanged(isEqual),
        map((trelloTestCases) => {
          if (trelloTestCases) {
            const statusGroups = trelloTestCases.reduce(
              (
                groups: { [group: string]: number },
                testCase: TrelloTestCase
              ) => {
                const key = testCase.status;
                if (!groups[key]) {
                  groups[key] = 0;
                }
                groups[key]++;
                return groups;
              },
              {}
            );

            this.doughnutChartLabels = Object.keys(statusGroups);
            this.doughnutChartData = {
              labels: this.doughnutChartLabels,
              datasets: [
                {
                  data: Object.values(statusGroups),
                },
              ],
            };
          }
        })
      )
      .subscribe();
  }
}
