import {HomePage} from '../pages/home.po';
import {StationBikesPage} from '../pages/station-bikes.po';
import {ReturnBikePage} from '../pages/return-bike.po';
import {browser, ElementFinder, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';

describe('renting and returning bike', () => {
  const homePage: HomePage = new HomePage();
  const stationBikesPage: StationBikesPage = new StationBikesPage();
  const returnBikePage: ReturnBikePage = new ReturnBikePage();

  beforeEach(async () => {
    await homePage.navigateToHome();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
    }
  });

  it('should list stations', async () => {
    expect(await homePage.getBikeStations().count()).toBeGreaterThan(0);
  });

  it('should list bikes on station', async () => {
    await homePage.getBikeStations().get(0).click();

    expect(await stationBikesPage.getStationBikes().count()).toBeGreaterThan(0);
  });

  it('should go back from selecting bike from station', async () => {
    await homePage.getBikeStations().get(0).click();
    await stationBikesPage.getReturnButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
  });

  it('should rent bike from station', async () => {
    const rentedBikes = await homePage.getRentedBikes().count();

    await rentBikeFromStation(0);

    expect(await homePage.getRentedBikes().count()).toEqual(rentedBikes + 1);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should list stations for returning bike', async () => {
    await rentBikeFromStation(0);

    const rentedBike = homePage.getRentedBikes().get(0);
    await rentedBike.click();
    await homePage.getRentedBikeReturnButton(rentedBike).click();

    expect(await returnBikePage.getBikeStations().count()).toBeGreaterThan(0);
  });

  it('should go back from selecting return station', async () => {
    await rentBikeFromStation(0);

    const rentedBike = homePage.getRentedBikes().get(0);
    await rentedBike.click();
    await homePage.getRentedBikeReturnButton(rentedBike).click();

    await returnBikePage.getReturnButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
  });

  it('should return bike on station', async () => {
    await rentBikeFromStation(0);
    const rentedBikes = await homePage.getRentedBikes().count();

    await returnBikeOnStation(0);

    expect(await homePage.getRentedBikes().count()).toEqual(rentedBikes - 1);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should not rent if 4 bikes rented', async () => {
    const rentedBikes = await homePage.getRentedBikes().count();

    for (let i = rentedBikes; i < 4; ++i) {
      await rentBikeFromStation(Math.floor(i / 2));
    }
    expect(await homePage.getRentedBikes().count()).toEqual(4);

    await rentBikeFromStation(3);

    expect(await homePage.getRentedBikes().count()).toEqual(4);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getErrorNotification().isPresent()).toBe(true);
  });

  afterEach(async () => {
    const rentedBikes = await homePage.getRentedBikes().count();
    for (let i = 0; i < rentedBikes; ++i) {
      await returnBikeOnStation(Math.floor(i / 2));
    }
  });

  function rentBikeFromStation(station: number): promise.Promise<any> {
    let bike: ElementFinder;
    return homePage.getBikeStations().get(station).click()
      .then(() => {
        bike = stationBikesPage.getStationBikes().get(0);
        bike.click();
      }).then(() => stationBikesPage.getBikeRentButton(bike).click());
  }

  function returnBikeOnStation(station: number): promise.Promise<any> {
    const rentedBike = homePage.getRentedBikes().get(0);
    return rentedBike.click().then(() => homePage.getRentedBikeReturnButton(rentedBike).click())
      .then(() => returnBikePage.getBikeStations().get(station).click());
  }
});
