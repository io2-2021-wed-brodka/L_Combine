import {HomePage} from '../pages/home.po';
import {StationBikesPage} from '../pages/station-bikes.po';
import {browser, ElementFinder, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {NewMalfunctionPage} from '../pages/new-malfunction.po';
import {ReturnBikePage} from '../pages/return-bike.po';

describe('report malfunction', () => {
  const homePage: HomePage = new HomePage();
  const newMalfunctionPage: NewMalfunctionPage = new NewMalfunctionPage();
  const stationBikesPage: StationBikesPage = new StationBikesPage();
  const returnBikePage: ReturnBikePage = new ReturnBikePage();

  beforeEach(async () => {
    await homePage.navigateToHome();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
    }
  });

  it('should navigate to new malfunction page', async () => {
    await rentBikeFromStation(0);
    await reportMalfunction();

    const url = await browser.getCurrentUrl();
    const regex = new RegExp(`${browser.baseUrl}rental/new-malfunction/`);
    expect(regex.test(url)).toBe(true);
  });

  it('should send malfunction', async () => {
    await rentBikeFromStation(0);
    await reportMalfunction();

    await newMalfunctionPage.getDescriptionTextbox().sendKeys('aa');
    await newMalfunctionPage.getReportButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  afterEach(async () => {
    await homePage.navigateToHome();
    const rentedBikes = await homePage.getRentedBikes().count();
    for (let i = 0; i < rentedBikes; ++i) {
      await returnBikeOnStation(Math.floor(i / 2));
    }
  });

  function reportMalfunction(): promise.Promise<any> {
    const rentedBike = homePage.getRentedBikes().get(0);
    return rentedBike.click().then(() => homePage.getRentedBikeMalfunctionButton(rentedBike).click());
  }

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
