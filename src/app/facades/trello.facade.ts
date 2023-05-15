import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromTrello } from '@store/trello/trello.selectors';
import { TrelloActions } from '@store/trello/trello.actions';
import { CardListsNames, TrelloBoard, TrelloCard } from '@models/api';

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
}
