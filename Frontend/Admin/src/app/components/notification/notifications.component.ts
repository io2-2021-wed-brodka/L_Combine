import {Component, NgZone, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Message} from '../../models/message';
import {NOTIFICATION_TIMEOUT} from '../../constants/notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  messages: Message[] = [];

  constructor(private notificationService: NotificationService, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.notificationService.notify().subscribe(message => {
      this.messages.push(message);
      this.zone.runOutsideAngular(() =>
        setTimeout(() => this.zone.run(() => this.remove(message)), NOTIFICATION_TIMEOUT));
    });
  }

  remove(message: Message): void {
    if (!this.messages.includes(message)) {
      return;
    }

    this.messages = this.messages.filter(x => x !== message);
  }
}
