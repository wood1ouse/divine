import { PostgrestError } from '@supabase/supabase-js';

export enum ApiStatuses {
  LOADING,
  LOADED,
  NOT_LOADED,
}

export interface ApiState {
  status: ApiStatuses;
  error: PostgrestError | null;
}

export interface HttpState {
  status: ApiStatuses;
  error: Error | null;
}
