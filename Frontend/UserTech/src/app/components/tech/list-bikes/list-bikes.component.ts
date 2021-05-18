import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bike, BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'app-list-bikes',
  templateUrl: './list-bikes.component.html',
  styleUrls: ['./list-bikes.component.scss']
})
export class ListBikesComponent implements OnInit {
  @Input() bikes!: Bike[];
  @Input() title!: string;
  @Output() listChanged = new EventEmitter();
  selectedBike: Bike | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  selectBike(bike: Bike): void {
    this.selectedBike = bike;
  }

  isBikeBlocked(bike: Bike): boolean{
    return bike.state === BikeState.Blocked
  }
  
  isBikeAvailable(bike: Bike): boolean{
    return bike.state === BikeState.Available || bike.state === BikeState.Reserved
  }
  
  bikeChanged(bike: Bike){
    this.bikes.splice(this.bikes.indexOf(bike),1)
    this.listChanged.emit();
  }
}
