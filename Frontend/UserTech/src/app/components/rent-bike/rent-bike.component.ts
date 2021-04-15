import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../models/bike';
import {RentBikeService} from '../../services/rent-bike.service';
import {NotificationService} from '../../services/notification.service';
import {RedirectService} from '../../services/redirect.service';

@Component({
  selector: 'app-rent-bike',
  templateUrl: './rent-bike.component.html',
  styleUrls: ['./rent-bike.component.scss']
})
export class RentBikeComponent implements OnInit {
  @Input() bike!: Bike;

  constructor(private rentBikeService: RentBikeService,
              private notificationService: NotificationService,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
  }

  rent(): void {
    this.rentBikeService.rentBike(this.bike).subscribe(_ => {
      this.redirectService.redirectToHome();
    });
  }
}
