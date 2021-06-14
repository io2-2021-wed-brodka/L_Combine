import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Malfunction, MalfunctionState } from 'src/app/models/malfunction';
import { BikeService } from 'src/app/services/bike.service';
import { MalfunctionService } from 'src/app/services/malfunction.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-malfunction-details',
  templateUrl: './malfunction-details.component.html',
  styleUrls: ['./malfunction-details.component.scss']
})
export class MalfunctionDetailsComponent implements OnInit {
  @Input() malfunction!: Malfunction;
  @Output() malfunctionChanged = new EventEmitter();
  constructor(
    private malfunctionService: MalfunctionService, 
    private bikeService: BikeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  isInReparation(){
    return this.malfunction.state === MalfunctionState.InReparation;
  }

  isRented(){
    return this.malfunction.state === MalfunctionState.BikeRented;
  }

  isWaiting(){
    return this.malfunction.state === MalfunctionState.Waiting;
  }

  cancelMalfunction(){
    this.malfunctionService.deleteMalfunction(this.malfunction).subscribe(()=>{
      this.malfunctionChanged.emit();
      this.notificationService.success("Usterka została anulowana");
    });
  }

  acceptMalfunction(){
    this.bikeService.block(this.malfunction.bikeId).subscribe(()=>{
      this.malfunctionChanged.emit();
      this.notificationService.success("Rower został zablokowany do naprawy");
    });
  }

  repairBike(){
    forkJoin([
      this.bikeService.unblock(this.malfunction.bikeId),
      this.malfunctionService.deleteMalfunction(this.malfunction)
    ]).subscribe(()=>{
      this.malfunctionChanged.emit();
      this.notificationService.success("Usterka została naprawiona");
    });
  }
}
