import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrelloReducer from './trello.reducer';

const selectTrelloState = createFeatureSelector<fromTrelloReducer.State>(
  fromTrelloReducer.featureKey
);

const selectTrelloUserName = createSelector(
  selectTrelloState,
  (state) => state.trelloUserName
);

export const fromTrello = {
  selectTrelloState,
  selectTrelloUserName,
};
