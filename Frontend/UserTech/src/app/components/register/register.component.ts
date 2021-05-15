import {Component, OnInit} from '@angular/core';
import {RedirectService} from '../../services/redirect.service';
import {RegisterService} from '../../services/register.service';
import {NotificationService} from '../../services/notification.service';
import {AuthenticateRequestDTO} from '../../dto/authenticate-request-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData = {
    login: '',
    password: '',
    repeatPassword: ''
  };
  showPasswordsNotMatch = false;
  showAccountNameTaken = false;

  constructor(
    private redirectService: RedirectService,
    private registerService: RegisterService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.formData.password !== this.formData.repeatPassword) {
      this.showPasswordsNotMatch = true;
      return;
    }

    const request: AuthenticateRequestDTO = {
      login: this.formData.login,
      password: this.formData.password
    };

    this.registerService.register(request).subscribe(_ => {
      this.notificationService.success('Konto zostało dodane');
      this.redirectService.redirectToLogin();
    }, error => {
      if (error.status === 409) {
        this.showAccountNameTaken = true;
      }
    });
  }

  repeatPasswordChange(): void {
    this.showPasswordsNotMatch = false;
  }

  loginChange(): void {
    this.showAccountNameTaken = false;
  }
}
