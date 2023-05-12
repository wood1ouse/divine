import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { of, from, EMPTY, filter } from 'rxjs';
import { TrelloActions } from './trello.actions';
import { ApiTrelloService } from '../../api/api.trello.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TrelloEffects {
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

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiTrelloService: ApiTrelloService
  ) {}
}
