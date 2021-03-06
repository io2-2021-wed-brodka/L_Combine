import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users!: User[]
  selectedUser: User | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersList();
  }
  getUsersList(){
    this.userService.getActiveUsers().subscribe(data=>{
      this.users = data;
    });
  }
  selectUser(user: User){
    this.selectedUser = user===this.selectedUser? undefined : user;
  }
}
