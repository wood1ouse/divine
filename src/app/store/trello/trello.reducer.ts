import { createFeature, createReducer, on } from '@ngrx/store';
import { TrelloActions } from './trello.actions';
import { ApiState, ApiStatuses } from '@models/store';

export const featureKey = 'trello';

export interface State extends ApiState {
  trelloUserName: string | null;
}

export const initialState: State = {
  trelloUserName: null,
  status: ApiStatuses.NOT_LOADED,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TrelloActions.linkWithTrello, (state) => ({
    ...state,
    status: ApiStatuses.LOADING,
  })),
  on(TrelloActions.linkWithTrelloSuccess, (state, { trelloMember }) => ({
    ...state,
    trelloUserName: trelloMember.username,
  })),
  on(TrelloActions.linkWithTrelloFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
