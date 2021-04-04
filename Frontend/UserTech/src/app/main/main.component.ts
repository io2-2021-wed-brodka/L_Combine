import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
  }
}
