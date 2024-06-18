export interface ILaunch {
  id: string;
  name?: string;
  links?: {
    wikipedia?: string;
  };
}

export enum ELaunchKeys {
  name = 'name',
  links = 'links',
}
