import {BikeDTO} from '../dto/bike-dto';
import {Bike, BikeState} from '../models/bike';
import {StationDTO} from '../dto/station-dto';
import {BikeStation} from '../models/bikeStation';
import {ReservedBikeDTO} from '../dto/reserved-bike-dto';
import {ReservedBike} from '../models/reserved-bike';

export function bikeFromDTO(bike: BikeDTO): Bike {
  return {
    id: bike.id,
    state: bike.bikeStatus,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
  };
}

export function stationFromDTO(station: StationDTO): BikeStation {
  return {
    id: station.id,
    locationName: station.name,
    stationState: station.status,
    bikeCount: station.activeBikeCount
  };
}

export function reservedBikeFromDTO(bike: ReservedBikeDTO): ReservedBike {
  return {
    id: bike.id,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
    state: BikeState.Reserved,
    reservedAt: new Date(bike.reservedAt || ''),
    reservedTill: new Date(bike.reservedTill || ''),
  };
}
