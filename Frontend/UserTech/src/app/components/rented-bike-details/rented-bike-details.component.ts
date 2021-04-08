import {Component, Input, OnInit} from '@angular/core';
import {RentedBike} from '../../models/rentedBike';

@Component({
  selector: 'app-rented-bike-details',
  templateUrl: './rented-bike-details.component.html',
  styleUrls: ['./rented-bike-details.component.scss']
})
export class RentedBikeDetailsComponent implements OnInit {
  @Input() bike!: RentedBike;

  constructor() {
  }

  ngOnInit(): void {
  }
}
