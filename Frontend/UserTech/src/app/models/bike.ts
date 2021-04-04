export interface Bike {
  id: number;
  state: BikeState;
  stationId: number;
}

export enum BikeState {
  Available = 'available',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
