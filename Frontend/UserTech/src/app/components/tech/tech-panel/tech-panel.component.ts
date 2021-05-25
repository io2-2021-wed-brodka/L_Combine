import {Component, OnInit} from '@angular/core';
import {Bike, BikeState} from 'src/app/models/bike';
import {BikeService} from 'src/app/services/bike.service';
import {bikeFromDTO} from 'src/app/utils/dto-utils';

@Component({
  selector: 'app-tech-panel',
  templateUrl: './tech-panel.component.html',
  styleUrls: ['./tech-panel.component.scss']
})
export class TechPanelComponent implements OnInit {

  constructor(private bikeService: BikeService) { }
  blockedBikes!: Bike[];
  unblockedBikes!: Bike[];

  ngOnInit(): void {
    this.getBikes();
  }
  getBikes(){
    this.bikeService.getAllBikes().subscribe(bikes => {
      [this.blockedBikes, this.unblockedBikes] = bikes.bikes.reduce((acc, bike) => {
        acc[bike.status === BikeState.Blocked ? 0 : 1].push(bikeFromDTO(bike));
        return acc;
      }, [new Array<Bike>(), new Array<Bike>()]);
    });
  }
}
