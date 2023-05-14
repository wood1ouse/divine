import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { fromTrello } from '@store/trello/trello.selectors';
import { TrelloActions } from '@store/trello/trello.actions';

@Injectable({
  providedIn: 'root',
})
export class TrelloFacade {
  constructor(private store: Store) {}

  trelloUserName$: Observable<string | null> = this.store.select(
    fromTrello.selectTrelloUserName
  );

  dispatchCheckLinkWithTrello(): void {
    this.store.dispatch(TrelloActions.checkLinkWithTrello());
  }

  dispatchLinkWithTrello(apiKey: string, token: string): void {
    this.store.dispatch(TrelloActions.linkWithTrello({ apiKey, token }));
  }
}
