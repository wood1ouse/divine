import { createAction, props } from '@ngrx/store';
import { TrelloBoard, TrelloCard, TrelloList, TrelloMember } from '@models/api';

const syncWithTrello = createAction(
  '[Trello] Sync With Trello',
  props<{ apiKey: string; token: string }>()
);

const checkLinkWithTrello = createAction('[Trello] Check Link With Trello');

const linkWithTrello = createAction(
  '[Trello] Link With Trello',
  props<{ apiKey: string; token: string }>()
);

const linkWithTrelloSuccess = createAction(
  '[Trello] Link With Trello Success',
  props<{ trelloMember: TrelloMember }>()
);

const linkWithTrelloFailure = createAction(
  '[Trello] Link With Trello Failure',
  props<{ error: Error }>()
);

const loadTrelloBoards = createAction('[Trello] Load Trello Boards');

const loadTrelloBoardsSuccess = createAction(
  '[Trello] Load Trello Boards Success',
  props<{ trelloBoards: TrelloBoard[] }>()
);

const loadTrelloBoardsFailure = createAction(
  '[Trello] Load Trello Boards Failure',
  props<{ error: Error }>()
);

const setActiveBoard = createAction(
  '[Trello] Set Active Board',
  props<{ trelloBoardId: string }>()
);

const setActiveCard = createAction(
  '[Trello] Set Active Card',
  props<{ trelloCardId: string }>()
);

const loadTrelloCards = createAction('[Trello] Load Trello Cards');

const loadTrelloCardsSuccess = createAction(
  '[Trello] Load Trello Cards Success',
  props<{ trelloCards: TrelloCard[] }>()
);

const loadTrelloCardsFailure = createAction(
  '[Trello] Load Trello Cards Failure',
  props<{ error: Error }>()
);

const loadTrelloList = createAction('[Trello] Load Trello List');

const loadTrelloListSuccess = createAction(
  '[Trello] Load Trello List Success',
  props<{ trelloList: TrelloList }>()
);

const loadTrelloListFailure = createAction(
  '[Trello] Load Trello List Failure',
  props<{ error: Error }>()
);

const resetTrelloArtifacts = createAction('[Trello] Reset Trello Artifacts');

const subscribeToCardListChanges = createAction(
  '[Trello] Subscribe To Card List Changes'
);

const unsubscribeToCardListChanges = createAction(
  '[Trello] Unsubscribe To Card List ChangesP'
);

export const TrelloActions = {
  syncWithTrello,
  checkLinkWithTrello,
  linkWithTrello,
  linkWithTrelloSuccess,
  linkWithTrelloFailure,
  loadTrelloBoards,
  loadTrelloBoardsSuccess,
  loadTrelloBoardsFailure,
  setActiveBoard,
  setActiveCard,
  loadTrelloCards,
  loadTrelloCardsSuccess,
  loadTrelloCardsFailure,
  loadTrelloList,
  loadTrelloListSuccess,
  loadTrelloListFailure,
  subscribeToCardListChanges,
  unsubscribeToCardListChanges,
  resetTrelloArtifacts,
};
