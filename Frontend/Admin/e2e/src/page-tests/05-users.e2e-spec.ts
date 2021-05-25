import {UsersPage} from '../pages/users.po';
import {browser, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {HomePage} from '../pages/home.po';

describe('users page', () => {
  let usersPage: UsersPage;
  let homePage: HomePage;

  beforeEach(async () => {
    usersPage = new UsersPage();
    homePage = new HomePage();
    await usersPage.navigateToUsers();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await usersPage.navigateToUsers();
    }
  });

  it('should block user', async () => {
    const blockedUsers = await usersPage.getBlockedUsers().count();
    const activeUsers = await usersPage.getActiveUsers().count();

    await blockUser();

    expect(await usersPage.getBlockedUsers().count()).toEqual(blockedUsers + 1);
    expect(await usersPage.getActiveUsers().count()).toEqual(activeUsers - 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should unblock user', async () => {
    await blockUser();
    const blockedUsers = await usersPage.getBlockedUsers().count();
    const activeUsers = await usersPage.getActiveUsers().count();

    await unblockUser();

    expect(await usersPage.getBlockedUsers().count()).toEqual(blockedUsers - 1);
    expect(await usersPage.getActiveUsers().count()).toEqual(activeUsers + 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  afterEach(async () => {
    const blockedUsers = await usersPage.getBlockedUsers().count();
    for (let i = 0; i < blockedUsers; ++i) {
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
});
