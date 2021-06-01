import {HomePage} from '../pages/home.po';
import {StationBikesPage} from '../pages/station-bikes.po';
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.po';

describe('bike availability', () => {
  const homePage: HomePage = new HomePage();
  const stationBikesPage: StationBikesPage = new StationBikesPage();

  beforeEach(async () => {
    await homePage.navigateToHome();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
    }
  });

  it('should show number of available bikes and match amount of listed bikes', async () => {
    const station = homePage.getBikeStations().get(0);
    const bikes = await homePage.getBikeStationAvailableBikesCount(station);
    await station.click();

    expect(await stationBikesPage.getStationBikes().count()).toEqual(bikes);
  });
});
