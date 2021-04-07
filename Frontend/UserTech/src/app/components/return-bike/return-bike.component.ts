import {Component, Input, OnInit} from '@angular/core';
import {RentedBike} from '../../models/rentedBike';

@Component({
  selector: 'app-return-bike',
  templateUrl: './return-bike.component.html',
  styleUrls: ['./return-bike.component.scss']
})
export class ReturnBikeComponent implements OnInit {
  @Input() bike!: RentedBike;

  constructor() {
  }

  ngOnInit(): void {
  }

  // TODO: podpiąć rentBikeService z metodą return
  return(): void {

  }
}
