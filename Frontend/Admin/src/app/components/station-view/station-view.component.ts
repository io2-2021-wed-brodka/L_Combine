import {Component, OnInit} from '@angular/core';
import {BikeStation} from '../../models/bikeStation';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.scss']
})
export class StationViewComponent implements OnInit {
  station?: BikeStation;

  constructor() { }

  ngOnInit(): void {
  }
}
