import { createAction, props } from '@ngrx/store';
import { PostgrestError } from '@supabase/supabase-js';
import { TrelloMember } from '@models/api';

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
  props<{ error: PostgrestError }>()
);

export const TrelloActions = {
  syncWithTrello,
  checkLinkWithTrello,
  linkWithTrello,
  linkWithTrelloSuccess,
  linkWithTrelloFailure,
};
