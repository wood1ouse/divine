import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromTrello } from '@store/trello/trello.selectors';
import { TrelloActions } from '@store/trello/trello.actions';
import {
  CardListsNames,
  TrelloBoard,
  TrelloCard,
  TrelloTestCase,
} from '@models/api';

@Injectable({
  providedIn: 'root',
})
export class TrelloFacade {
  constructor(private store: Store) {}

  trelloUserName$: Observable<string | null> = this.store.select(
    fromTrello.selectTrelloUserName
  );

  trelloBoards$: Observable<TrelloBoard[] | null> = this.store.select(
    fromTrello.selectTrelloBoards
  );

  trelloCards$: Observable<TrelloCard[] | null> = this.store.select(
    fromTrello.selectTrelloCards
  );

  trelloCardList$: Observable<CardListsNames | null> = this.store.select(
    fromTrello.selectActiveCardList
  );

  trelloTestCases$: Observable<TrelloTestCase[] | null> = this.store.select(
    fromTrello.selectTrelloTestCases
  );

  trelloTestCaseStatuses$: Observable<string[]> = this.store.select(
    fromTrello.selectTrelloTestCaseStatuses
  );

  trelloTestCaseBoards$: Observable<string[]> = this.store.select(
    fromTrello.selectTrelloTestCaseBoards
  );

  boardFilter$: Observable<string | null> = this.store.select(
    fromTrello.selectBoardFilter
  );

  statusFilter$: Observable<string | null> = this.store.select(
    fromTrello.selectStatusFilter
  );

  dispatchCheckLinkWithTrello(): void {
    this.store.dispatch(TrelloActions.checkLinkWithTrello());
  }

  dispatchLinkWithTrello(apiKey: string, token: string): void {
    this.store.dispatch(TrelloActions.linkWithTrello({ apiKey, token }));
  }

  dispatchSetActiveTrelloBoard(trelloBoardId: string): void {
    this.store.dispatch(TrelloActions.setActiveBoard({ trelloBoardId }));
  }

  dispatchSetActiveTrelloCard(trelloCardId: string): void {
    this.store.dispatch(TrelloActions.setActiveCard({ trelloCardId }));
  }

  dispatchSubscribeToCardListChanges(): void {
    this.store.dispatch(TrelloActions.subscribeToCardListChanges());
  }

  dispatchUnsubscribeToCardListChanges(): void {
    this.store.dispatch(TrelloActions.unsubscribeToCardListChanges());
  }

  dispatchResetTrelloArtifacts(): void {
    this.store.dispatch(TrelloActions.resetTrelloArtifacts());
  }

  dispatchSetBoardFilter(board: string): void {
    this.store.dispatch(TrelloActions.setBoardFilter({ board }));
  }

  dispatchSetTestingStatusFilter(testingStatus: string): void {
    this.store.dispatch(
      TrelloActions.setTestingStatusFilter({ testingStatus })
    );
  }

  dispatchResetActiveFilters(): void {
    this.store.dispatch(TrelloActions.resetActiveFilters());
  }
}
