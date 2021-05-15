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
      await homePage.navigateToHome();
    }
  });

  it('stationsNav should navigate to stations page', async () => {
    await homePage.getStationsNav().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/stations`);
  });

  it('bikesNav should navigate to bikes page', async () => {
    await homePage.getBikesNav().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/bikes`);
  });

  it('usersNav should navigate to users page', async () => {
    await homePage.getUsersNav().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/users`);
  });
});
