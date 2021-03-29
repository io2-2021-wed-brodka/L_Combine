import {Component, OnInit} from '@angular/core';
import {StationService} from '../services/station.service';
import {ActivatedRoute} from '@angular/router';
import {BikeStation} from '../models/bikeStation';
import {Location} from '@angular/common';
import {Bike, BikeState} from '../models/bike';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit {
  station!: BikeStation;
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
    const stationId = +(this.route.snapshot.paramMap.get('id') || '-1');
    this.stationService.getStation(stationId).subscribe(station => this.station = station);
  }

  goBack(): void {
    this.location.back();
  }

  getBikeStateText(state: BikeState): string {
    switch (state) {
      case BikeState.Blocked:
        return 'Zablokowany';
      case BikeState.Free:
        return 'Wolny';
      case BikeState.Reserved:
        return 'Zarezerwowany';
    }
  }

  selectBike(bike: Bike): void {
    this.selectedBike = (this.selectedBike === bike || bike?.state !== 'free') ? undefined : bike;
  }
}
