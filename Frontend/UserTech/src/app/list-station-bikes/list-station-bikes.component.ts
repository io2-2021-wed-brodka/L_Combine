import { Component, OnInit } from '@angular/core';
import {StationService} from '../services/station.service';
import {ActivatedRoute} from '@angular/router';
import {BikeStation} from '../models/bikeStation';

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
  ) { }

  ngOnInit(): void {
    const stationId = +(this.route.snapshot.paramMap.get('id') || '-1');
    this.stationService.getStation(stationId).subscribe(station => this.station = station);
  }

}
