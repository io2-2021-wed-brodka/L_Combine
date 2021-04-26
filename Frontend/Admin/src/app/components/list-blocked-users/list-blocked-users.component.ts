import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-blocked-users',
  templateUrl: './list-blocked-users.component.html',
  styleUrls: ['./list-blocked-users.component.scss']
})
export class ListBlockedUsersComponent implements OnInit {
  users!: User[]
  selectedUser: User | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersList();
  }
  getUsersList(){
    this.userService.getBlockedUsers().subscribe(data=>{
      this.users = data;
    });
  }
  selectUser(user: User){
    this.selectedUser = user===this.selectedUser? undefined : user;
  }
}
