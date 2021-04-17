import {Component, Input, OnInit} from '@angular/core';
import {RentBikeService} from '../../services/rent-bike.service';
import {NotificationService} from '../../services/notification.service';
import {RedirectService} from '../../services/redirect.service';
import {ReservationService} from '../../services/reservation.service';
import {ReservedBike} from '../../models/reserved-bike';

@Component({
  selector: 'app-reserved-bike-details',
  templateUrl: './reserved-bike-details.component.html',
  styleUrls: ['./reserved-bike-details.component.scss']
})
export class ReservedBikeDetailsComponent implements OnInit {
  @Input() bike!: ReservedBike;

  constructor(private rentBikeService: RentBikeService,
              private notificationService: NotificationService,
              private redirectService: RedirectService,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
  }

  rent(): void {
    this.rentBikeService.rentBike(this.bike).subscribe(_ => {
      this.notificationService.success(`Bike rented from ${this.bike.station?.locationName}`);
      this.redirectService.redirectToHome();
    });
  }

  cancel(): void {
    this.reservationService.cancelReservation(this.bike.id).subscribe(_ => {
      this.notificationService.success('Reservation was cancelled');
      this.redirectService.redirectToHome();
    });
  }
}
