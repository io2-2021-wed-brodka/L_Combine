export interface Bike {
  id: number;
  state: BikeState;
  stationId: number;
}

export enum BikeState {
  Available = 'available',
  Rented = 'rented',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
