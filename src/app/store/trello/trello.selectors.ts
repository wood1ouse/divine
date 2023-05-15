import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrelloReducer from './trello.reducer';

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

export const fromTrello = {
  selectTrelloState,
  selectTrelloUserName,
  selectTrelloBoards,
  selectActiveTrelloBoardId,
  selectTrelloCards,
  selectActiveTrelloCardId,
  selectActiveCardList,
  selectTrackCardList,
};
