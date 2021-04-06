export interface BikeStation {
  id: number;
  locationName: string;
  stationState: StationState;
}

export enum StationState {
  Active = 'active',
  Blocked = 'blocked'
}
