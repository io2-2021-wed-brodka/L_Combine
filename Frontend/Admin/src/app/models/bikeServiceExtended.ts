import { BikeStation } from "./bikeStation";

export interface BikeStationExtended extends BikeStation {
    malfunctionCount: number;
    reservationCount: number;
  }
  