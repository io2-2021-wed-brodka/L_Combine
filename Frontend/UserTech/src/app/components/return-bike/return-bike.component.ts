import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StationService} from '../../services/station.service';
import {stationFromDTO} from '../../utils/dto-utils';
import {BikeStation} from '../../models/bikeStation';
import {RentBikeService} from '../../services/rent-bike.service';
import {RedirectService} from '../../services/redirect.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-return-bike',
  templateUrl: './return-bike.component.html',
  styleUrls: ['./return-bike.component.scss']
})
export class ReturnBikeComponent implements OnInit {
  bikeId: string;
  stations: BikeStation[] = [];

  constructor(
    private stationService: StationService,
    private rentBikeService: RentBikeService,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
    private notificationService: NotificationService) {

    this.bikeId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations().subscribe(stations =>
      this.stations = stations.stations.map<BikeStation>(stationFromDTO)
    );
  }

  goBack(): void {
    this.redirectService.goBack();
  }

  returnBike(station: BikeStation): void {
    this.rentBikeService.returnBike(this.bikeId, station.id).subscribe(_ => {
      this.notificationService.success(`Rower został oddany na stacji ${station.locationName}`);
      this.redirectService.redirectToHome();
    });
  }
}
