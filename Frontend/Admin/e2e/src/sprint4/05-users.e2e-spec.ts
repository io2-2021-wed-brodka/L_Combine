import {UsersPage} from '../pages/users.po';
import {browser, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {HomePage} from '../pages/home.po';
import {IncomingMessage} from 'http';

describe('users page', () => {
  let usersPage: UsersPage;
  let homePage: HomePage;

  let blockedUsers: number;
  let activeUsers: number;

  beforeEach(async () => {
    usersPage = new UsersPage();
    homePage = new HomePage();
    await registerUser();
    await usersPage.navigateToUsers();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await homePage.getUsersNav().click();
    }

    blockedUsers = await usersPage.getBlockedUsers().count();
    activeUsers = await usersPage.getActiveUsers().count();
  });

  it('should block user', async () => {
    await blockUser();

    expect(await usersPage.getBlockedUsers().count()).toEqual(blockedUsers + 1);
    expect(await usersPage.getActiveUsers().count()).toEqual(activeUsers - 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should unblock user', async () => {
    await blockUser();
    await unblockUser();

    expect(await usersPage.getBlockedUsers().count()).toEqual(blockedUsers);
    expect(await usersPage.getActiveUsers().count()).toEqual(activeUsers);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  afterEach(async () => {
    const blocked = await usersPage.getBlockedUsers().count();
    for (let i = 0; i < blocked; ++i) {
      await unblockUser();
    }
  });

  function blockUser(): promise.Promise<any> {
    const user = usersPage.getActiveUsers().get(0);
    return user.click().then(() => usersPage.getActiveUserBlockButton(user).click());
  }

  function unblockUser(): promise.Promise<any> {
    const user = usersPage.getBlockedUsers().get(0);
    return user.click().then(() => usersPage.getBlockedUserUnblockButton(user).click());
  }

  function registerUser(): any {
    let response = false;
    const http = require('http');
    const data = {login: 'aa', password: 'aa'};
    const options = {
      port: 8080,
      hostname: 'localhost',
      path: '/register',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    };

    const request = http.request(options, (result: IncomingMessage) => {
      result.on('data', (_: any) => {
        response = true;
      });
    });

    request.write(JSON.stringify(data));
    request.end();

    return browser.wait(() => response, 2000);
  }
});
