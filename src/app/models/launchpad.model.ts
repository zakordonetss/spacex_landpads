import { ILaunch } from './launch.model';

export interface ILaunchpad {
  id: string;
  name?: string;
  full_name?: string;
  status?: ELaunchpadStatus;
  locality?: string;
  region?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  launch_attempts?: number;
  launch_successes?: number;
  rockets?: string[];
  launches: ILaunch[];
}

export enum ELaunchpadStatus {
  active = 'active',
  inactive = 'inactive',
  unknown = 'unknown',
  retired = 'retired',
  lost = 'lost',
  under_construction = 'under construction',
}

export enum ELaunchpadKeys {
  id = 'id',
  name = 'name',
  region = 'region',
  launches = 'launches',
}
