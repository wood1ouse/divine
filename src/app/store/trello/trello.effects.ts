import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of, from, filter, EMPTY, interval } from 'rxjs';
import { TrelloActions } from './trello.actions';
import { ApiTrelloService } from '../../api/api.trello.service';
import { Store } from '@ngrx/store';
import { fromTrello } from '@store/trello/trello.selectors';

@Injectable()
export class TrelloEffects {
  isTrackingCardList$ = this.store.select(fromTrello.selectTrackCardList);

  checkLinkWithTrello$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.checkLinkWithTrello),
      switchMap(() => this.apiTrelloService.checkLinkWithTrello()),
      filter((trelloUserData) => trelloUserData !== null),
      map((trelloUserData) =>
        TrelloActions.syncWithTrello({
          apiKey: trelloUserData!.apiKey,
          token: trelloUserData!.token,
        })
      ),
      catchError((error) => of(TrelloActions.linkWithTrelloFailure({ error })))
    )
  );

  syncWithTrello$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.syncWithTrello),
      concatMap(({ apiKey, token }) =>
        from(this.apiTrelloService.syncWithTrello(apiKey, token)).pipe(
          map((trelloMember) =>
            TrelloActions.linkWithTrelloSuccess({ trelloMember })
          ),
          catchError((error) =>
            of(TrelloActions.linkWithTrelloFailure({ error }))
          )
        )
      )
    )
  );

  linkWithTrello$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.linkWithTrello),
      concatMap(({ apiKey, token }) =>
        from(this.apiTrelloService.syncWithTrello(apiKey, token)).pipe(
          tap(() => this.apiTrelloService.addUserToTrelloUsers(apiKey, token)),
          map((trelloMember) =>
            TrelloActions.linkWithTrelloSuccess({ trelloMember })
          ),
          catchError((error) =>
            of(TrelloActions.linkWithTrelloFailure({ error }))
          )
        )
      )
    )
  );

  loadTrelloBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrelloActions.loadTrelloBoards),
      concatMap(() =>
        from(this.apiTrelloService.getBoards()).pipe(
          map((trelloBoards) =>
            TrelloActions.loadTrelloBoardsSuccess({ trelloBoards })
          ),
          catchError((error) =>
            of(TrelloActions.loadTrelloBoardsFailure({ error }))
          )
        )
      )
    );
  });

  loadTrelloCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrelloActions.loadTrelloCards),
      withLatestFrom(this.store.select(fromTrello.selectActiveTrelloBoardId)),
      concatMap(([_, boardId]) => {
        if (boardId) {
          return from(this.apiTrelloService.getCards(boardId)).pipe(
            map((trelloCards) =>
              TrelloActions.loadTrelloCardsSuccess({ trelloCards })
            ),
            catchError((error) =>
              of(TrelloActions.loadTrelloCardsFailure({ error }))
            )
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  loadTrelloList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrelloActions.loadTrelloList),
      withLatestFrom(this.store.select(fromTrello.selectActiveTrelloCardId)),
      concatMap(([, trelloCardId]) => {
        if (trelloCardId) {
          return from(this.apiTrelloService.getList(trelloCardId)).pipe(
            map((trelloList) =>
              TrelloActions.loadTrelloListSuccess({ trelloList })
            ),
            catchError((error) => {
              return of(TrelloActions.loadTrelloListFailure({ error }));
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

  getTrelloBoardsOnLinkWithTrelloSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.linkWithTrelloSuccess),
      concatMap(() => {
        return [
          TrelloActions.loadTrelloBoards(),
          TrelloActions.loadTrelloCards(),
        ];
      })
    )
  );

  loadTrelloCardsOnLoadTrelloBoardsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.loadTrelloBoardsSuccess),
      map(() => {
        return TrelloActions.loadTrelloCards();
      })
    )
  );

  getTrelloCardsSetActiveBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrelloActions.setActiveBoard),
      map(() => {
        return TrelloActions.loadTrelloCards();
      })
    )
  );

  pollChanges$ = createEffect(() =>
    this.isTrackingCardList$.pipe(
      switchMap((isTrackingCardList) => {
        if (isTrackingCardList) {
          return interval(2000).pipe(
            switchMap(() =>
              of(
                TrelloActions.loadTrelloList(),
                TrelloActions.loadTrelloCards()
              )
            )
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiTrelloService: ApiTrelloService
  ) {}
}
