import { createReducer, on } from '@ngrx/store';
import { TrelloActions } from './trello.actions';
import { ApiStatuses, HttpState } from '@models/store';
import {
  CardListsNames,
  TrelloBoard,
  TrelloCard,
  TrelloTestCase,
} from '@models/api';

export const featureKey = 'trello';

export interface State extends HttpState {
  trelloUserName: string | null;
  trelloBoards: TrelloBoard[];
  trelloCards: TrelloCard[];
  activeBoardId: string | null;
  activeCardId: string | null;
  activeCardList: CardListsNames | null;
  trelloTestCases: TrelloTestCase[];
  testingStatusFilter: string | null;
  boardFilter: string | null;
  trackCardList: boolean;
  trackTrelloTestCases: boolean;
}

export const initialState: State = {
  trelloUserName: null,
  trelloBoards: [],
  trelloCards: [],
  activeBoardId: null,
  activeCardId: null,
  activeCardList: null,
  trackCardList: false,
  trackTrelloTestCases: false,
  trelloTestCases: [],
  testingStatusFilter: null,
  boardFilter: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(
    TrelloActions.linkWithTrello,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.linkWithTrelloSuccess,
    (state, { trelloMember }): State => ({
      ...state,
      trelloUserName: trelloMember.username,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.linkWithTrelloFailure,
    (state, { error }): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(
    TrelloActions.loadTrelloBoards,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.loadTrelloBoardsSuccess,
    (state, { trelloBoards }): State => ({
      ...state,
      status: ApiStatuses.LOADED,
      trelloBoards,
    })
  ),
  on(
    TrelloActions.loadTrelloBoardsFailure,
    (state, { error }): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(
    TrelloActions.setActiveBoard,
    (state, { trelloBoardId }): State => ({
      ...state,
      activeCardId: null,
      activeCardList: null,
      activeBoardId: trelloBoardId,
    })
  ),
  on(
    TrelloActions.setActiveCard,
    (state, { trelloCardId }): State => ({
      ...state,
      activeCardId: trelloCardId,
    })
  ),
  on(
    TrelloActions.loadTrelloCards,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.loadTrelloCardsSuccess,
    (state, { trelloCards }): State => ({
      ...state,
      status: ApiStatuses.LOADED,
      trelloCards,
    })
  ),
  on(
    TrelloActions.loadTrelloCardsFailure,
    (state, { error }): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(
    TrelloActions.loadTrelloList,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.loadTrelloListSuccess,
    (state, { trelloList }): State => ({
      ...state,
      status: ApiStatuses.LOADED,
      activeCardList: trelloList.name,
    })
  ),
  on(
    TrelloActions.loadTrelloListFailure,
    (state, { error }): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(
    TrelloActions.subscribeToCardListChanges,
    (state): State => ({
      ...state,
      trackCardList: true,
    })
  ),
  on(
    TrelloActions.unsubscribeToCardListChanges,
    (state): State => ({
      ...state,
      trackCardList: false,
    })
  ),
  on(TrelloActions.resetTrelloArtifacts, (state) => ({
    ...state,
    activeBoardId: null,
    activeCardId: null,
    activeCardList: null,
  })),
  on(
    TrelloActions.loadTrelloTestCases,
    (state): State => ({
      ...state,
      status: ApiStatuses.LOADING,
      error: null,
    })
  ),
  on(
    TrelloActions.loadTrelloTestCasesSuccess,
    (state, { trelloTestCases }): State => ({
      ...state,
      status: ApiStatuses.LOADED,
      trelloTestCases,
    })
  ),
  on(
    TrelloActions.loadTrelloTestCasesFailure,
    (state, { error }): State => ({
      ...state,
      status: ApiStatuses.NOT_LOADED,
      error,
    })
  ),
  on(
    TrelloActions.setBoardFilter,
    (state, { board }): State => ({
      ...state,
      boardFilter: board,
    })
  ),
  on(
    TrelloActions.setTestingStatusFilter,
    (state, { testingStatus }): State => ({
      ...state,
      testingStatusFilter: testingStatus,
    })
  ),
  on(
    TrelloActions.resetActiveFilters,
    (state): State => ({
      ...state,
      boardFilter: null,
      testingStatusFilter: null,
    })
  )
);
