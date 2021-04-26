import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BikeStation} from '../../models/bikeStation';
import {Bike, BikeState} from '../../models/bike';
import {StationService} from '../../services/station.service';
import {bikeFromDTO} from '../../../../../UserTech/src/app/utils/dto-utils';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit, OnChanges {
  @Input() station!: BikeStation;
  bikes: Bike[] = [];

  constructor(private stationService: StationService) {
  }

  ngOnInit(): void {
    this.getStationBikes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getStationBikes();
  }

  private getStationBikes(): void {
    if (this.station) {
      this.stationService.getStationBikes(this.station.id).subscribe(bikes =>
        this.bikes = bikes.bikes.map<Bike>(bikeFromDTO)
      );
    }
  }

  getBikeStateText(state: BikeState): string {
    switch (state) {
      case BikeState.Blocked:
        return 'Zablokowany';
      case BikeState.Available:
        return 'Wolny';
      case BikeState.Reserved:
        return 'Zarezerwowany';
      case BikeState.Rented:
        return 'Wypożyczony';
    }
  }
}
