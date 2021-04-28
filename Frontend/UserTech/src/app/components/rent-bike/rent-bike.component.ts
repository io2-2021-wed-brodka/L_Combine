import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../models/bike';
import {RentBikeService} from '../../services/rent-bike.service';
import {NotificationService} from '../../services/notification.service';
import {RedirectService} from '../../services/redirect.service';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-rent-bike',
  templateUrl: './rent-bike.component.html',
  styleUrls: ['./rent-bike.component.scss']
})
export class RentBikeComponent implements OnInit {
  @Input() bike!: Bike;

  constructor(private rentBikeService: RentBikeService,
              private notificationService: NotificationService,
              private redirectService: RedirectService,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
  }

  rent(): void {
    this.rentBikeService.rentBike(this.bike).subscribe(_ => {
      this.notificationService.success(`Rower został wypożyczony ze stacji ${this.bike.station?.locationName}`);
      this.redirectService.redirectToHome();
    });
  }

  reserve(): void {
    this.reservationService.reserveBike(this.bike.id).subscribe(_ => {
      this.notificationService.success(`Bike from station ${this.bike.station?.locationName} was reserved for you`);
      this.redirectService.redirectToHome();
    });
  }
}
