export interface IRequestOptions {
  limit?: number;
  populate?: IPopulationOptions;
  select?: any;
  pagination?: boolean;
}

export interface IPopulationOptions {
  path: EPopulatedOptions;
  select?: string;
}

export enum EPopulatedOptions {
  launches = 'launches',
}
