import {Component, OnInit} from '@angular/core';
import {Role} from 'src/app/dto/authenticate-response-dto';
import {LoginService} from '../../services/login.service';
import {FOOTER_CONSTS} from '../../constants/footer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isTech!: boolean;
  phoneNumber: string = FOOTER_CONSTS.PHONE_NUMBER;
  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    const role = this.loginService.getRole();
    this.isTech = role === Role.Tech || role === Role.Admin;
  }

  logout(): void {
    this.loginService.logout();
  }
}
