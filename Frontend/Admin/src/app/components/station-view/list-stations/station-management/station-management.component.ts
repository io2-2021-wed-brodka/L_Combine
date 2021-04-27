import {Component, Input, OnInit} from '@angular/core';
import {BikeStation} from '../../../../models/bikeStation';
import {StationService} from '../../../../services/station.service';
import {NotificationService} from '../../../../services/notification.service';
import {RedirectService} from '../../../../services/redirect.service';

@Component({
  selector: 'app-station-management',
  templateUrl: './station-management.component.html',
  styleUrls: ['./station-management.component.scss']
})
export class StationManagementComponent implements OnInit {
  @Input() station!: BikeStation;

  constructor(private stationService: StationService,
              private notificationService: NotificationService,
              private redirectService: RedirectService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.stationService.deleteStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została usunięta`);
      this.redirectService.reload();
    });
  }

  block(): void {
    this.stationService.blockStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została zablokowana`);
      this.redirectService.reload();
    });
  }

  unblock(): void {
    this.stationService.unblockStation(this.station.id).subscribe(_ => {
      this.notificationService.success(`Stacja ${this.station.locationName} została odblokowana`);
      this.redirectService.reload();
    });
  }
}
