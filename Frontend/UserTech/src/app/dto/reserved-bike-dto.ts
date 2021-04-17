import {StationDTO} from './station-dto';

export interface ReservedBikeDTO {
  id: string;
  station?: StationDTO;
  reservedAt?: Date;
  reservedTill?: Date;
}

export interface ReservedBikesDTO {
  bikes: ReservedBikeDTO[];
}
