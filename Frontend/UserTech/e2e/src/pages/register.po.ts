import {$, $$, browser, ElementFinder, promise} from 'protractor';

export class RegisterPage {
  get login(): string {
    return 'login1';
  }

  get password(): string {
    return 'haslo';
  }

  navigateToRegister(): promise.Promise<any> {
    return browser.get('/register');
  }

  getLoginInput(): ElementFinder {
    return $('#loginInput');
  }

  getPasswordInput(): ElementFinder {
    return $('#passwordInput');
  }

  getRepeatPasswordInput(): ElementFinder {
    return $('#repeatPasswordInput');
  }

  getRegisterButton(): ElementFinder {
    return $('.main-button');
  }

  getLoginError(): ElementFinder {
    return $$('.form-group').get(0).$('.form-error');
  }

  getPasswordError(): ElementFinder {
    return $$('.form-group').get(1).$('.form-error');
  }

  getRepeatPasswordError(): ElementFinder {
    return $$('.form-group').get(2).$('.form-error');
  }

  preformRegister(): promise.Promise<any> {
    return this.getLoginInput().sendKeys(this.login)
      .then(() => this.getPasswordInput().sendKeys(this.password))
      .then(() => this.getRepeatPasswordInput().sendKeys(this.password))
      .then(() => this.getRegisterButton().click());
  }
}
