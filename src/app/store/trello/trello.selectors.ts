import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrelloReducer from './trello.reducer';
import { fromTestCase } from '@store/test-case/test-case.selectors';

const selectTrelloState = createFeatureSelector<fromTrelloReducer.State>(
  fromTrelloReducer.featureKey
);

const selectTrelloUserName = createSelector(
  selectTrelloState,
  (state) => state.trelloUserName
);

const selectTrelloBoards = createSelector(selectTrelloState, (state) =>
  state.trelloBoards.length ? state.trelloBoards : null
);

const selectActiveTrelloBoardId = createSelector(
  selectTrelloState,
  (state) => state.activeBoardId
);

const selectActiveTrelloCardId = createSelector(
  selectTrelloState,
  (state) => state.activeCardId
);

const selectTrelloCards = createSelector(selectTrelloState, (state) =>
  state.trelloCards.length ? state.trelloCards : null
);

const selectActiveCardList = createSelector(
  selectTrelloState,
  selectActiveTrelloCardId,
  (state, activeTrelloCard) => (activeTrelloCard ? state.activeCardList : null)
);

const selectTrackCardList = createSelector(
  selectTrelloState,
  (state) => state.trackCardList
);

const selectTrelloTestCaseStatuses = createSelector(
  selectTrelloState,
  (state) =>
    state.trelloTestCases && state.trelloTestCases.length
      ? Array.from(
          new Set(
            state.trelloTestCases.map((trelloTestCase) => trelloTestCase.status)
          )
        )
      : []
);

const selectTrelloTestCaseBoards = createSelector(selectTrelloState, (state) =>
  state.trelloTestCases && state.trelloTestCases.length
    ? Array.from(
        new Set(
          state.trelloTestCases.map(
            (trelloTestCase) => trelloTestCase.trelloBoard
          )
        )
      )
    : []
);

const selectBoardFilter = createSelector(
  selectTrelloState,
  (state) => state.boardFilter
);

const selectStatusFilter = createSelector(
  selectTrelloState,
  (state) => state.testingStatusFilter
);

const selectTrelloTestCases = createSelector(
  selectTrelloState,
  selectBoardFilter,
  selectStatusFilter,
  fromTestCase.selectTestCases,
  (state, currentTrelloBoard, currentStatus, testCases) => {
    if (!testCases.length) return [];
    return state.testingStatusFilter || state.boardFilter
      ? state.trelloTestCases.filter(
          (item) =>
            item.trelloBoard === currentTrelloBoard &&
            item.status === currentStatus
        )
      : state.trelloTestCases;
  }
);

export const fromTrello = {
  selectTrelloState,
  selectTrelloUserName,
  selectTrelloBoards,
  selectActiveTrelloBoardId,
  selectTrelloCards,
  selectActiveTrelloCardId,
  selectActiveCardList,
  selectTrackCardList,
  selectBoardFilter,
  selectStatusFilter,
  selectTrelloTestCases,
  selectTrelloTestCaseStatuses,
  selectTrelloTestCaseBoards,
};
