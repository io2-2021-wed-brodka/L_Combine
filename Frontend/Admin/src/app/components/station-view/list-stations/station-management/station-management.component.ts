import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BikeStation} from '../../../../models/bikeStation';
import {StationService} from '../../../../services/station.service';
import {NotificationService} from '../../../../services/notification.service';
import { BikeStationExtended } from 'src/app/models/bikeStationWithDetails';

@Component({
  selector: 'app-station-management',
  templateUrl: './station-management.component.html',
  styleUrls: ['./station-management.component.scss']
})
export class StationManagementComponent implements OnInit {
  @Input() station!: BikeStationExtended;
  @Output() stationModified: EventEmitter<BikeStation> = new EventEmitter<BikeStation>();

  constructor(private stationService: StationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.stationService.deleteStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została usunięta`);
      this.stationModified.emit(this.station);
    });
  }

  block(): void {
    this.stationService.blockStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została zablokowana`);
      this.stationModified.emit(this.station);
    });
  }

  unblock(): void {
    this.stationService.unblockStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została odblokowana`);
      this.stationModified.emit(this.station);
    });
  }
}
