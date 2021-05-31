import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedirectService} from '../../../services/redirect.service';
import {NotificationService} from '../../../services/notification.service';
import {MalfunctionService} from '../../../services/malfunction.service';

@Component({
  selector: 'app-new-malfunction',
  templateUrl: './new-malfunction.component.html',
  styleUrls: ['./new-malfunction.component.scss']
})
export class NewMalfunctionComponent implements OnInit {
  bikeId: string;
  description = '';

  constructor(private route: ActivatedRoute,
              private redirectService: RedirectService,
              private notificationService: NotificationService,
              private malfunctionService: MalfunctionService) {

    this.bikeId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.redirectService.goBack();
  }

  report(): void {
    this.malfunctionService.postMalfunction({id: this.bikeId, description: this.description}).subscribe(_ => {
      this.notificationService.success(`Usterka została zgłoszona`);
      this.redirectService.redirectToHome();
    });
  }
}
