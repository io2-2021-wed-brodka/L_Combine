import {Component, OnInit} from '@angular/core';
import { Bike } from 'src/app/models/bike';
import { bikeFromDTO } from 'src/app/utils/dto-utils';
import {BikeService} from '../../services/bike.service';

@Component({
  selector: 'app-list-rented-bikes',
  templateUrl: './list-rented-bikes.component.html',
  styleUrls: ['./list-rented-bikes.component.scss']
})
export class ListRentedBikesComponent implements OnInit {
  reservedBikes: Bike[] = [];

  constructor(private userService: BikeService) {
  }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.userService.getRentedBikes().subscribe(bikes =>
      this.reservedBikes = bikes.bikes.map(bikeFromDTO)
      );
  }
}
