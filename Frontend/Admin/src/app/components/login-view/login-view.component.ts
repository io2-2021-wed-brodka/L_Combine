import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import LoginData from '../../models/loginData';
import {RedirectService} from '../../services/redirect.service';

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
    private redirectService: RedirectService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.formData).subscribe(_ => {
      this.redirectService.redirectToHome();
    }, _ => {
      this.showErrorMessage = true;
    });
  }
}
