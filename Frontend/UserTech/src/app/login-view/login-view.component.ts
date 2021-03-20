import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import LoginData from './../interfaces/LoginData'

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  formData: LoginData = {
    login: "",
    password: ""
  }
  showErrorMessage = false;
  showCorrectMessage = false;
  login(){
    if(this.formData.login.length>0 && this.formData.password.length>0){
      if(this.loginService.login(this.formData))
      {
        this.showErrorMessage = false;
        this.showCorrectMessage = true;
      }
      else
      {
        this.showErrorMessage = true;
        this.showCorrectMessage = false;
      }
    }
    else{
      this.showErrorMessage = false;
      this.showCorrectMessage = false;
    }
  }
}
