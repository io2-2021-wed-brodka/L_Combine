import {BikesPage} from '../pages/bikes.po';
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.po';

describe('bikes page', () => {
  let bikesPage: BikesPage;

  beforeEach(async () => {
    bikesPage = new BikesPage();
    await bikesPage.navigateToBikes();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await bikesPage.navigateToBikes();
    }
  });

  it('should list bikes', async () => {
    expect(await bikesPage.getBikes().count()).toBeGreaterThan(0);
  });
});
