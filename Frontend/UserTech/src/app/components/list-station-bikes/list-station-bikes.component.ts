import {Component, Input, OnInit} from '@angular/core';
import {StationService} from '../../services/station.service';
import {ActivatedRoute} from '@angular/router';
import {BikeStation} from '../../models/bikeStation';
import {Bike, BikeState} from '../../models/bike';
import {bikeFromDTO, stationFromDTO} from '../../utils/dto-utils';
import {RedirectService} from '../../services/redirect.service';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit {
  stationName!: string;
  bikes: Bike[] = [];
  selectedBike: Bike | undefined;

  constructor(
    private stationService: StationService,
    private route: ActivatedRoute,
    private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.getStation();
  }

  getStation(): void {
    const stationId = this.route.snapshot.paramMap.get('id') || '';
    this.stationName = this.route.snapshot.paramMap.get('name') || '';
    this.stationService.getStationBikes(stationId).subscribe(bikes =>
      this.bikes = bikes.bikes.map<Bike>(bikeFromDTO)
    );
  }

  goBack(): void {
    this.redirectService.goBack();
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
