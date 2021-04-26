import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unblock-user',
  templateUrl: './unblock-user.component.html',
  styleUrls: ['./unblock-user.component.scss']
})
export class UnblockUserComponent implements OnInit {
  @Input() user!: User;
  constructor(
    private userService: UserService,
    private redirectService: RedirectService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  unblockUser(){
    this.userService.unblockUser(this.user).subscribe(()=>{
      this.notificationService.success('Użytkownik został odblokowany');
      this.redirectService.reload();
    });
  }

}
