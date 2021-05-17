import { Component, OnInit } from '@angular/core';
import { Bike } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { bikeFromDTO } from 'src/app/utils/dto-utils';

@Component({
  selector: 'app-list-bikes',
  templateUrl: './list-bikes.component.html',
  styleUrls: ['./list-bikes.component.scss']
})
export class ListBikesComponent implements OnInit {
  bikes!: Bike[];
  selectedBike: Bike | undefined;

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(){
    this.bikeService.getAllBikes().subscribe(dto=>
      this.bikes = dto.bikes.map(bikeFromDTO)
    );
  }

  selectBike(bike: Bike): void {
    this.selectedBike = (this.selectedBike === bike || bike?.state !== 'available') ? undefined : bike;
  }
}
