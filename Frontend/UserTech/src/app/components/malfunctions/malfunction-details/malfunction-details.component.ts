import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Malfunction, MalfunctionState } from 'src/app/models/malfunction';
import { BikeService } from 'src/app/services/bike.service';
import { MalfunctionService } from 'src/app/services/malfunction.service';

@Component({
  selector: 'app-malfunction-details',
  templateUrl: './malfunction-details.component.html',
  styleUrls: ['./malfunction-details.component.scss']
})
export class MalfunctionDetailsComponent implements OnInit {
  @Input() malfunction!: Malfunction;
  @Output() malfunctionChanged = new EventEmitter();
  constructor(private malfunctionService: MalfunctionService, private bikeService: BikeService) { }

  ngOnInit(): void {
  }
  isInReparation(){
    console.log(this.malfunction.state)
    return this.malfunction.state === MalfunctionState.InReparation;
  }
  isRented(){
    console.log(this.malfunction.state)
    return this.malfunction.state === MalfunctionState.BikeRented;
  }
  isWaiting(){
    console.log(this.malfunction.state)
    return this.malfunction.state === MalfunctionState.Waiting;
  }
  deleteMalfunction(){
    this.malfunctionService.deleteMalfunction(this.malfunction).subscribe(()=>
      this.malfunctionChanged.emit()
    );
    
  }
  acceptMalfunction(){
    //this.bikeService.block()
    this.malfunctionChanged.emit();
  }
}
