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
    this.loginService.login(this.formData).subscribe(value=>{
        if(value)
        {
          this.showErrorMessage = false;
          this.showCorrectMessage = true;
        }
        else
        {
          this.showErrorMessage = true;
          this.showCorrectMessage = false;
        }
      });
    }
}
