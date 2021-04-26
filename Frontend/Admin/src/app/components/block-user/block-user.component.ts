import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {
  @Input() user!: User;
  constructor(
    private userService: UserService,
    private redirectService: RedirectService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  blockUser(){
    this.userService.blockUser(this.user).subscribe(()=>{
      this.notificationService.success('Użytkownik został zablokowany');
      this.redirectService.reload();
    });
  }
}
