import {browser, by, element, ElementFinder, promise} from 'protractor';

export class RegisterPage {
  get login(): string {
    return 'login2';
  }

  get password(): string {
    return 'haslo';
  }

  navigateToRegister(): promise.Promise<any> {
    return browser.get('/register');
  }

  getLoginInput(): ElementFinder {
    return element(by.css('#loginInput'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('#passwordInput'));
  }

  getRepeatPasswordInput(): ElementFinder {
    return element(by.css('#repeatPasswordInput'));
  }

  getRegisterButton(): ElementFinder {
    return element(by.css('.main-button'));
  }

  getLoginError(): ElementFinder {
    return element.all(by.css('.form-group')).get(0).element(by.css('.form-error'));
  }

  getPasswordError(): ElementFinder {
    return element.all(by.css('.form-group')).get(1).element(by.css('.form-error'));
  }

  getRepeatPasswordError(): ElementFinder {
    return element.all(by.css('.form-group')).get(2).element(by.css('.form-error'));
  }
}
