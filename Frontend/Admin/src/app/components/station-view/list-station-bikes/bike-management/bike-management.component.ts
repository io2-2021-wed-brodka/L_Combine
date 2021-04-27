import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bike} from '../../../../models/bike';
import {BikeService} from '../../../../services/bike.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-bike-management',
  templateUrl: './bike-management.component.html',
  styleUrls: ['./bike-management.component.scss']
})
export class BikeManagementComponent implements OnInit {
  @Input() bike!: Bike;
  @Output() bikeModified: EventEmitter<Bike> = new EventEmitter<Bike>();

  constructor(private bikeService: BikeService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.bikeService.deleteBike(this.bike.id).subscribe(_ => {
      this.notificationService.success(`Rower został usunięty ze stacji ${this.bike.station?.locationName}`);
      this.bikeModified.emit(this.bike);
    });
  }

  block(): void {
    this.bikeService.blockBike(this.bike.id).subscribe(_ => {
      this.notificationService.success('Rower został zablokowany');
      this.bikeModified.emit(this.bike);
    });
  }

  unblock(): void {
    this.bikeService.unblockBike(this.bike.id).subscribe(_ => {
      this.notificationService.success('Rower został odblokowany');
      this.bikeModified.emit(this.bike);
    });
  }
}
