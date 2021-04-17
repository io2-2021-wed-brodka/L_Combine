import {Component, OnInit} from '@angular/core';
import {reservedBikeFromDTO} from '../../utils/dto-utils';
import {ReservedBike} from '../../models/reserved-bike';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservedBikes: ReservedBike[] = [];
  selectedBike: ReservedBike | undefined;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.getReservedBikes();
  }

  getReservedBikes(): void {
    this.reservationService.getReservedBikes().subscribe(bikes =>
      this.reservedBikes = bikes.bikes.map(reservedBikeFromDTO)
    );
  }

  selectBike(bike: ReservedBike): void {
    this.selectedBike = this.selectedBike === bike ? undefined : bike;
  }
}
