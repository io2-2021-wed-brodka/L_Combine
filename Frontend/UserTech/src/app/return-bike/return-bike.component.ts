import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../models/bike';
import {RentBikeService} from '../services/rent-bike.service';
import {Router} from '@angular/router';
import {RentResult} from '../models/rentResult';

@Component({
  selector: 'app-return-bike',
  templateUrl: './return-bike.component.html',
  styleUrls: ['./return-bike.component.scss']
})
export class ReturnBikeComponent implements OnInit {
  @Input() bike!: Bike;

  constructor() {
  }

  ngOnInit(): void {
  }
}
