import {StationDTO} from './station-dto';

export interface ReservedBikeDTO {
  id: string;
  station: StationDTO;
  reservedAt: string;
  reservedTill: string;
}

export interface ReservedBikesDTO {
  bikes: ReservedBikeDTO[];
}
