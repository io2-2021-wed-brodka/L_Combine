import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../../../models/bike';

@Component({
  selector: 'app-bike-management',
  templateUrl: './bike-management.component.html',
  styleUrls: ['./bike-management.component.scss']
})
export class BikeManagementComponent implements OnInit {
  @Input() bike!: Bike;

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {

  }
}
