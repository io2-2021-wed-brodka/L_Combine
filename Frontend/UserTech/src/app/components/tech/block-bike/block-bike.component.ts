import { Component, Input, OnInit } from '@angular/core';
import { Bike } from 'src/app/models/bike';

@Component({
  selector: 'app-block-bike',
  templateUrl: './block-bike.component.html',
  styleUrls: ['./block-bike.component.scss']
})
export class BlockBikeComponent implements OnInit {
  @Input() bike!: Bike;
  constructor() { }

  ngOnInit(): void {
  }

  block(){
    
  }

}
