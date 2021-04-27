import {StationState} from '../models/bikeStation';

export interface StationDTO {
  id: string;
  name: string;
  status: StationState;
  activeBikeCount: number;
}
