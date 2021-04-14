export interface BikeStation {
  id: string;
  locationName: string;
  stationState: StationState;
}

export enum StationState {
  Active = 'active',
  Blocked = 'blocked'
}
