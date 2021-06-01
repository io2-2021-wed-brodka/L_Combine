import {HomePage} from '../pages/home.po';
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.po';

describe('home screen', () => {
  let homePage: HomePage;

  beforeEach(async () => {
    homePage = new HomePage();
    await homePage.navigateToHome();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
    }
  });

  it('logout button should log out', async () => {
    await homePage.getLogoutButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}login`);
  });
});
