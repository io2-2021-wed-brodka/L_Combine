import {BikeDTO} from '../dto/bike-dto';
import {Bike} from '../models/bike';
import {StationDTO} from '../dto/station-dto';
import {BikeStation, StationState} from '../models/bikeStation';

export function bikeFromDTO(bike: BikeDTO): Bike {
  return {
    id: bike.id,
    state: bike.bikeStatus,
    stationId: parseInt(bike.station.id, 10)
  };
}

export function stationFromDTO(station: StationDTO): BikeStation {
  return {
    id: station.id,
    locationName: station.name,
    stationState: StationState.Active
  };
}
