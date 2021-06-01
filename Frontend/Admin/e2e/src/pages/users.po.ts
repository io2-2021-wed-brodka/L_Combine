import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class UsersPage {
  navigateToUsers(): promise.Promise<any> {
    return browser.get('/rental/users');
  }

  getTechsNav(): ElementFinder {
    return $('button');
  }

  getActiveUsers(): ElementArrayFinder {
    return $('app-list-users').$$('.list-item');
  }

  getActiveUserBlockButton(activeUser: ElementFinder): ElementFinder {
    return activeUser.$('button');
  }

  getBlockedUsers(): ElementArrayFinder {
    return $('app-list-blocked-users').$$('.list-item');
  }

  getBlockedUserUnblockButton(blockedUser: ElementFinder): ElementFinder {
    return blockedUser.$('button');
  }
}
