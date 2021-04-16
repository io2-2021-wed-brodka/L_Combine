export interface Bike {
  id: string;
  state: BikeState;
  stationId: string | undefined;
}

export enum BikeState {
  Available = 'available',
  Rented = 'rented',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
