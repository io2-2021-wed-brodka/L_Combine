import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bike } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-unblock-bike',
  templateUrl: './unblock-bike.component.html',
  styleUrls: ['./unblock-bike.component.scss']
})
export class UnblockBikeComponent implements OnInit {
  @Input() bike!: Bike;
  @Output() bikeChanged = new EventEmitter();
  constructor(
    private bikeService: BikeService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  unblock(){
    this.bikeService.unblock(this.bike.id).subscribe(()=>{
      this.bikeChanged.emit();
      this.notificationService.success('Rower został odblokowany');
    });
  }
}
