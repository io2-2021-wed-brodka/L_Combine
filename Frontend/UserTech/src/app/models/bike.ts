export interface Bike {
  id: number;
  state: BikeState;
  stationId: number;
}

export enum BikeState {
  Free= 'free',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
