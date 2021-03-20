import { Component, OnInit } from '@angular/core';
import {StationService} from '../services/station.service';
import {ActivatedRoute} from '@angular/router';
import {BikeStation} from '../models/bikeStation';
import {Location} from '@angular/common';

@Component({
  selector: 'app-list-station-bikes',
  templateUrl: './list-station-bikes.component.html',
  styleUrls: ['./list-station-bikes.component.scss']
})
export class ListStationBikesComponent implements OnInit {
  station: BikeStation;

  constructor(
    private stationService: StationService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

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
}
