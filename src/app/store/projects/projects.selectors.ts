import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjectsReducer from './projects.reducer';

const selectProjectsState = createFeatureSelector<fromProjectsReducer.State>(
  fromProjectsReducer.featureKey
);

const selectProjects = createSelector(
  selectProjectsState,
  (state) => state.projects
);

export const fromProject = {
  selectProjectsState,
  selectProjects,
};
