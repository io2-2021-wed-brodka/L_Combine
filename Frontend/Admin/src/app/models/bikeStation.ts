export interface BikeStation {
  id: string;
  locationName: string;
  stationState: StationState;
  bikeCount: number;
}

export enum StationState {
  Active = 'active',
  Blocked = 'blocked'
}
