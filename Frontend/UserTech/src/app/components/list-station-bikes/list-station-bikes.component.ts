import {Component, OnInit} from '@angular/core';
import {StationService} from '../../services/station.service';
import {ActivatedRoute} from '@angular/router';
import {BikeStation} from '../../models/bikeStation';
import {Location} from '@angular/common';
import {Bike, BikeState} from '../../models/bike';
import {bikeFromDTO, stationFromDTO} from '../../utils/dto-utils';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit {
  station: BikeStation | undefined;
  bikes: Bike[] = [];
  selectedBike: Bike | undefined;

  constructor(
    private stationService: StationService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getStation();
  }

  getStation(): void {
    const stationId = this.route.snapshot.paramMap.get('id') || '';
    this.stationService.getStation(stationId).subscribe(station => this.station = stationFromDTO(station));
    this.stationService.getStationBikes(stationId).subscribe(bikes =>
      this.bikes = bikes.bikes.map<Bike>(bikeFromDTO)
    );
  }

  goBack(): void {
    this.location.back();
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

  selectBike(bike: Bike): void {
    this.selectedBike = (this.selectedBike === bike || bike?.state !== 'available') ? undefined : bike;
  }
}