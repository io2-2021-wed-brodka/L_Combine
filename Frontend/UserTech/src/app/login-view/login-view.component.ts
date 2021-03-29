import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import LoginData from '../models/LoginData';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  formData: LoginData = {
    login: '',
    password: ''
  };
  showErrorMessage = false;

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.formData).subscribe(value => {
      if (value) {
        this.router.navigate(['']);
      }
      else {
        this.showErrorMessage = true;
      }
    });
  }
}
