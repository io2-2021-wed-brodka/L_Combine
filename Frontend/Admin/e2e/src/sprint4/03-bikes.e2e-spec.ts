import {BikesPage} from '../pages/bikes.po';
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {HomePage} from '../pages/home.po';

describe('bikes page', () => {
  let bikesPage: BikesPage;
  let homePage: HomePage;

  beforeEach(async () => {
    bikesPage = new BikesPage();
    homePage = new HomePage();
    await bikesPage.navigateToBikes();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await homePage.getBikesNav().click();
    }
  });

  it('should list bikes', async () => {
    expect(await bikesPage.getBikes().count()).toBeGreaterThan(0);
  });
});
