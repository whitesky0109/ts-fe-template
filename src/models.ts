export interface IResultPayload {
  id: number;
  key: string;
  uuid: string;
  // unix time
  created: number;

  [key: string]: any;
}

export interface IUsersPayload {
  page: number;
  result: IResultPayload[];
  size: number;
}
