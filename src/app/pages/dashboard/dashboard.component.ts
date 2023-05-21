import { Component, OnInit } from '@angular/core';
import { TrelloFacade } from '@facades/trello.facade';
import { ProjectsFacade } from '@facades/projects.facade';

@Component({
  selector: 'divine-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private trelloFacade: TrelloFacade,
    private projectsFacade: ProjectsFacade
  ) {}

  async ngOnInit() {
    this.trelloFacade.dispatchCheckLinkWithTrello();

    this.projectsFacade.dispatchLoadProjects();
  }
}
