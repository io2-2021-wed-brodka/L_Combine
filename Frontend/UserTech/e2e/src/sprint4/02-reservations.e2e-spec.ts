import {HomePage} from '../pages/home.po';
import {StationBikesPage} from '../pages/station-bikes.po';
import {ReturnBikePage} from '../pages/return-bike.po';
import {browser, ElementFinder, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';

describe('reservations', () => {
  const homePage: HomePage = new HomePage();
  const stationBikesPage: StationBikesPage = new StationBikesPage();
  const returnBikePage: ReturnBikePage = new ReturnBikePage();

  beforeEach(async () => {
    await homePage.navigateToHome();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
    }
  });

  it('should reserve from station', async () => {
    const reservedBikes = await homePage.getReservedBikes().count();

    await reserveBikeFromStation(0);

    expect(await homePage.getReservedBikes().count()).toEqual(reservedBikes + 1);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should rent reserved bike', async () => {
    await reserveBikeFromStation(0);
    const reservedBikes = await homePage.getReservedBikes().count();

    const bike = homePage.getReservedBikes().get(0);
    await bike.click();
    await homePage.getReservedBikeRentButton(bike).click();

    expect(await homePage.getReservedBikes().count()).toEqual(reservedBikes - 1);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should cancel reserved bike', async () => {
    await reserveBikeFromStation(0);
    const reservedBikes = await homePage.getReservedBikes().count();

    await cancelReservation();

    expect(await homePage.getReservedBikes().count()).toEqual(reservedBikes - 1);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should not reserve if 3 bikes reserved', async () => {
    const reservedBikes = await homePage.getReservedBikes().count();

    for (let i = reservedBikes; i < 3; ++i) {
      await reserveBikeFromStation(Math.floor(i / 2));
    }
    expect(await homePage.getReservedBikes().count()).toEqual(3);

    await reserveBikeFromStation(2);

    expect(await homePage.getReservedBikes().count()).toEqual(3);
    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getErrorNotification().isPresent()).toBe(true);
  });

  afterEach(async () => {
    const reservedBikes = await homePage.getReservedBikes().count();
    for (let i = 0; i < reservedBikes; ++i) {
      await cancelReservation();
    }

    const rentedBikes = await homePage.getRentedBikes().count();
    for (let i = 0; i < rentedBikes; ++i) {
      await returnBikeOnStation(i);
    }
  });

  function reserveBikeFromStation(station: number): promise.Promise<any> {
    let bike: ElementFinder;
    return homePage.getBikeStations().get(station).click()
      .then(() => browser.getCurrentUrl())
      .then((url: string) => {
        console.log(url);
        bike = stationBikesPage.getStationBikes().get(0);
        bike.click();
      }).then(() => stationBikesPage.getBikeReserveButton(bike).click());
  }

  function returnBikeOnStation(station: number): promise.Promise<any> {
    const rentedBike = homePage.getRentedBikes().get(0);
    return rentedBike.click().then(() => homePage.getRentedBikeReturnButton(rentedBike).click())
      .then(() => returnBikePage.getBikeStations().get(station).click());
  }

  function cancelReservation(): promise.Promise<any> {
    const reservedBike = homePage.getReservedBikes().get(0);
    return reservedBike.click().then(() => homePage.getReservedBikeCancelButton(reservedBike).click());
  }
});
