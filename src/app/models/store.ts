export enum ApiStatuses {
  LOADING,
  LOADED,
  NOT_LOADED,
}

export interface ApiState {
  status: ApiStatuses;
}
