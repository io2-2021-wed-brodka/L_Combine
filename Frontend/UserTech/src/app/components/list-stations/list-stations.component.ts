import {Component, OnInit} from '@angular/core';
import {BikeStation} from '../../models/bikeStation';
import {StationService} from '../../services/station.service';
import {stationFromDTO} from '../../utils/dto-utils';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit {
  stations: BikeStation[] = [];

  constructor(
    private stationService: StationService
  ) {
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations().subscribe(stations =>
      this.stations = stations.stations.map<BikeStation>(stationFromDTO)
    );
  }
}
