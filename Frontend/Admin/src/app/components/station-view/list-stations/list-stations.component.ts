import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BikeStation} from '../../../models/bikeStation';
import {stationFromDTO} from '../../../utils/dto-utils';
import {StationService} from '../../../services/station.service';
import {RedirectService} from '../../../services/redirect.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit {
  stations: BikeStation[] = [];
  selectedStation?: BikeStation;

  @Output() selectedStationChanged: EventEmitter<BikeStation> = new EventEmitter<BikeStation>();
  newStationName = '';

  constructor(private stationService: StationService,
              private redirectService: RedirectService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations().subscribe(stations =>
      this.stations = stations.stations.map<BikeStation>(stationFromDTO)
    );
  }

  selectStation(station: BikeStation): void {
    this.selectedStation = (this.selectedStation === station) ? undefined : station;
    this.selectedStationChanged.emit(station);
  }

  addStation(): void {
    this.stationService.addStation({name: this.newStationName}).subscribe(station => {
      this.notificationService.success(`Stacja ${station.name} została dodana`);
      this.redirectService.reload();
    });
  }
}
