import {browser, by, element, ElementFinder, promise} from 'protractor';

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
    return element(by.css('#loginInput'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('#passwordInput'));
  }

  getLoginButton(): ElementFinder {
    return element(by.css('.main-button'));
  }

  getLoginError(): ElementFinder {
    return element(by.css('.form-error'));
  }

  getRegisterLink(): ElementFinder {
    return element(by.css('.register'));
  }
}
