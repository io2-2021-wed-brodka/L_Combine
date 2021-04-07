import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {StationService} from '../../services/station.service';
import {stationFromDTO} from '../../utils/dto-utils';
import {BikeStation} from '../../models/bikeStation';
import {RentBikeService} from '../../services/rent-bike.service';

@Component({
  selector: 'app-return-bike',
  templateUrl: './return-bike.component.html',
  styleUrls: ['./return-bike.component.scss']
})
export class ReturnBikeComponent implements OnInit {
  bikeId: number;
  stations: BikeStation[] = [];

  constructor(
    private stationService: StationService,
    private rentBikeService: RentBikeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.bikeId = +(this.route.snapshot.paramMap.get('id') || '-1');
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
    this.location.back();
  }

  returnBike(station: BikeStation): void {
    this.rentBikeService.return(this.bikeId, station.id).subscribe(_ => this.router.navigate(['']));
  }
}
