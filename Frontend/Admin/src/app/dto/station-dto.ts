import {StationState} from '../models/bikeStation';

export interface StationDTO {
  id: string;
  name: string;
  status: StationState;
  activeBikesCount: number;
  bikesLimit: number;
}
