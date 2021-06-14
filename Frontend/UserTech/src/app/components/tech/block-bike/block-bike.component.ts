import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Bike, BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-block-bike',
  templateUrl: './block-bike.component.html',
  styleUrls: ['./block-bike.component.scss']
})
export class BlockBikeComponent implements OnInit {
  @Input() bike!: Bike;
  @Output() bikeChanged = new EventEmitter();
  constructor(
    private bikeService: BikeService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  block(){
    this.bikeService.block(this.bike.id).subscribe(()=>{
      this.bikeChanged.emit();
      this.notificationService.success('Rower został zablokowany');
    });
  }

}
