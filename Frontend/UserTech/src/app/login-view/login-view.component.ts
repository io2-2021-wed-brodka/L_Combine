import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import LoginData from '../models/loginData';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }
  showErrorMessage = false;

  formData: LoginData = {
    login: '',
    password: ''
  };

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.formData).subscribe(value => {
      if (value) {
        this.router.navigate(['/rentedBikes']);
      }
      else {
        this.showErrorMessage = true;
      }
    });
  }
}
