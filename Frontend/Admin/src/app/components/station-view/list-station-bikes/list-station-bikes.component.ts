import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BikeStation} from '../../../models/bikeStation';
import {Bike, BikeState} from '../../../models/bike';
import {StationService} from '../../../services/station.service';
import {bikeFromDTO} from 'src/app/utils/dto-utils';
import {BikeService} from '../../../services/bike.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit, OnChanges {
  @Input() station?: BikeStation;
  selectedBike?: Bike;
  bikes: Bike[] = [];

  constructor(private stationService: StationService,
              private bikeService: BikeService,
              private notificationService: NotificationService) {
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
        return 'Dostępny';
      case BikeState.Reserved:
        return 'Zarezerwowany';
      case BikeState.Rented:
        return 'Wypożyczony';
    }
  }

  selectBike(bike: Bike): void {
    this.selectedBike = bike;
  }

  addBike(): void {
    if (this.station) {
      this.bikeService.addBike({stationId: this.station.id}).subscribe(_ => {
        this.notificationService.success(`Rower został dodany na stację ${this.station?.locationName}`);
        this.getStationBikes();
      });
    }
  }

  onBikeModified(): void {
    this.getStationBikes();
  }
}
