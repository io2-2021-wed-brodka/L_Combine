import {$, browser, by, element, ElementFinder, promise} from 'protractor';

export class HomePage {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/rental/home');
  }

  getStationsNav(): ElementFinder {
    return element(by.cssContainingText('.navigation-link', 'Stacje'));
  }

  getBikesNav(): ElementFinder {
    return element(by.cssContainingText('.navigation-link', 'Rowery'));
  }

  getUsersNav(): ElementFinder {
    return element(by.cssContainingText('.navigation-link', 'Użytkownicy'));
  }

  getSuccessNotification(): ElementFinder {
    return $('.message-success');
  }

  getErrorNotification(): ElementFinder {
    return $('.message-error');
  }

  getLogoutButton(): ElementFinder {
    return $('.logout');
  }


}
