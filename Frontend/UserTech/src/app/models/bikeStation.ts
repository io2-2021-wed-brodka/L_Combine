import {Bike} from './bike';

export interface BikeStation {
  id: number;
  locationName: string;
  stationState: StationState;
  bikes: Bike[];
}

export enum StationState{
  Active = 'active',
  Blocked = 'blocked'
}
