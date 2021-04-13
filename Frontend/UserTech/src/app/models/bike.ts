export interface Bike {
  id: string;
  state: BikeState;
  stationId: string;
}

export enum BikeState {
  Available = 'available',
  Rented = 'rented',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
