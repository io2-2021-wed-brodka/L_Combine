import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../models/bike'

@Component({
  selector: 'app-rented-bike-details',
  templateUrl: './rented-bike-details.component.html',
  styleUrls: ['./rented-bike-details.component.scss']
})
export class RentedBikeDetailsComponent implements OnInit {
  @Input() bike!: Bike;

  constructor() {
  }

  ngOnInit(): void {
  }
}
