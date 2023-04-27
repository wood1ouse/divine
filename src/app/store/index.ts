import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthReducer from '@store/auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export interface AppState {
  [fromAuthReducer.featureKey]: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuthReducer.featureKey]: fromAuthReducer.reducer,
};

export const effects = [AuthEffects];
