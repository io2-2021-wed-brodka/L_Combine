import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BikeStation} from '../../../models/bikeStation';
import {stationFromDTO} from '../../../utils/dto-utils';
import {StationService} from '../../../services/station.service';
import {NotificationService} from '../../../services/notification.service';
import { NewStationDTO } from 'src/app/dto/new-station-dto';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list-stations.component.html',
  styleUrls: ['./list-stations.component.scss']
})
export class ListStationsComponent implements OnInit {
  stations: BikeStation[] = [];
  selectedStation?: BikeStation;

  @Output() selectedStationChanged: EventEmitter<BikeStation> = new EventEmitter<BikeStation>();
  newStation: NewStationDTO = {
    name: '',
    bikesLimit: undefined
  }
  constructor(private stationService: StationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.newStation = {
      name: '',
      bikesLimit: undefined
    }
    this.stationService.getStations().subscribe(stations =>
      this.stations = stations.stations.map<BikeStation>(stationFromDTO)
    );
  }

  selectStation(station: BikeStation): void {
    this.selectedStation = station;
    this.selectedStationChanged.emit(station);
  }

  addStation(): void {
    console.log(this.newStation);
    this.stationService.addStation(this.newStation).subscribe(station => {
      this.notificationService.success(`Stacja ${station.name} została dodana`);
      this.getStations();
    });
  }

  onStationModified(): void {
    this.getStations();
  }

  bikeLimitChanged(): void{
    if(this.newStation && this.newStation.bikesLimit! < 0 )
      this.newStation.bikesLimit = 0;
  }
}
