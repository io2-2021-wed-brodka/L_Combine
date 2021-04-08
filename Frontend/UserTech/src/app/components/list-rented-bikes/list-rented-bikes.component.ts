import {Component, OnInit} from '@angular/core';
import {RentedBike} from '../../models/rentedBike';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list-rented-bikes',
  templateUrl: './list-rented-bikes.component.html',
  styleUrls: ['./list-rented-bikes.component.scss']
})
export class ListRentedBikesComponent implements OnInit {
  rentedBikes: RentedBike[] = [];
  selectedBike: RentedBike | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void {
    this.userService.getRentedBikes().subscribe(bikes => this.rentedBikes = bikes);
  }

  selectBike(bike: RentedBike): void {
    this.selectedBike = this.selectedBike === bike ? undefined : bike;
  }
}
