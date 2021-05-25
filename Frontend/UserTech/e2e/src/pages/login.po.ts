import {$, browser, ElementFinder, promise} from 'protractor';

export class LoginPage {
  get login(): string {
    return 'login1';
  }

  get password(): string {
    return 'haslo';
  }

  navigateToLogin(): promise.Promise<any> {
    return browser.get('/login');
  }

  getLoginInput(): ElementFinder {
    return $('#loginInput');
  }

  getPasswordInput(): ElementFinder {
    return $('#passwordInput');
  }

  getLoginButton(): ElementFinder {
    return $('.main-button');
  }

  getLoginError(): ElementFinder {
    return $('.form-error');
  }

  getRegisterLink(): ElementFinder {
    return $('.register');
  }

  preformLogin(): promise.Promise<any> {
    return this.getLoginInput().sendKeys(this.login)
      .then(() => this.getPasswordInput().sendKeys(this.password))
      .then(() => this.getLoginButton().click());
  }

  preformCustomLogin(login: string, password: string): promise.Promise<any> {
    return this.getLoginInput().sendKeys(login)
      .then(() => this.getPasswordInput().sendKeys(password))
      .then(() => this.getLoginButton().click());
  }
}
