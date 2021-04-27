import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../../../models/bike';
import {BikeService} from '../../../../services/bike.service';
import {NotificationService} from '../../../../services/notification.service';
import {RedirectService} from '../../../../services/redirect.service';

@Component({
  selector: 'app-bike-management',
  templateUrl: './bike-management.component.html',
  styleUrls: ['./bike-management.component.scss']
})
export class BikeManagementComponent implements OnInit {
  @Input() bike!: Bike;

  constructor(private bikeService: BikeService,
              private notificationService: NotificationService,
              private redirectService: RedirectService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.bikeService.deleteBike(this.bike.id).subscribe(_ => {
      this.notificationService.success(`Rower został usunięty ze stacji ${this.bike.station?.locationName}`);
      this.redirectService.reload();
    });
  }
}
