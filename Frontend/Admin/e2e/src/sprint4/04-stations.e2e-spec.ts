import {browser, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {HomePage} from '../pages/home.po';
import {StationsPage} from '../pages/stations.po';

describe('stations page', () => {
  let stationsPage: StationsPage;
  let homePage: HomePage;
  let startingStationsCount: number;

  beforeEach(async () => {
    stationsPage = new StationsPage();
    homePage = new HomePage();
    await stationsPage.navigateToStations();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await homePage.getStationsNav().click();
    }

    startingStationsCount = await stationsPage.getStations().count();
  });

  it('should add station', async () => {
    const stationsCount = await stationsPage.getStations().count();

    await createStation('asd');

    expect(await stationsPage.getStations().count()).toEqual(stationsCount + 1);
    expect(await stationsPage.getStationStateText(stationsCount)).toEqual(stationsPage.stationActiveText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should block station', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    const stationIdx = stationsCount - 1;

    await blockStation(stationIdx);

    expect(await stationsPage.getStations().count()).toEqual(stationsCount);
    expect(await stationsPage.getStationStateText(stationIdx)).toEqual(stationsPage.stationBlockedText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should unblock station', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    const stationIdx = stationsCount - 1;
    await blockStation(stationIdx);

    await unblockStation(stationIdx);

    expect(await stationsPage.getStations().count()).toEqual(stationsCount);
    expect(await stationsPage.getStationStateText(stationIdx)).toEqual(stationsPage.stationActiveText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should remove station', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    const stationIdx = stationsCount - 1;
    await blockStation(stationIdx);

    await deleteStation(stationIdx);

    expect(await stationsPage.getStations().count()).toEqual(stationsCount - 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should add bike', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    await stationsPage.getStations().get(stationsCount - 1).click();
    const bikesCount = await stationsPage.getBikes().count();

    await addBike();

    expect(await stationsPage.getBikes().count()).toEqual(bikesCount + 1);
    expect(await stationsPage.getBikeStateText()).toEqual(stationsPage.bikeActiveText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should block bike', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    await stationsPage.getStations().get(stationsCount - 1).click();
    await addBike();
    const bikesCount = await stationsPage.getBikes().count();

    await blockBike();

    expect(await stationsPage.getBikes().count()).toEqual(bikesCount);
    expect(await stationsPage.getBikeStateText()).toEqual(stationsPage.bikeBlockedText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should unblock bike', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    await stationsPage.getStations().get(stationsCount - 1).click();
    await addBike();
    await blockBike();
    const bikesCount = await stationsPage.getBikes().count();

    await unblockBike();

    expect(await stationsPage.getBikes().count()).toEqual(bikesCount);
    expect(await stationsPage.getBikeStateText()).toEqual(stationsPage.bikeActiveText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should delete bike', async () => {
    await createStation('asd');
    const stationsCount = await stationsPage.getStations().count();
    await stationsPage.getStations().get(stationsCount - 1).click();
    await addBike();
    await blockBike();
    const bikesCount = await stationsPage.getBikes().count();

    await deleteBike();

    expect(await stationsPage.getBikes().count()).toEqual(bikesCount - 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('station should have specified limit', async () => {
    const stationLimit = 5;
    await createStationWithLimit('aaa', stationLimit);
    const stationsCount = await stationsPage.getStations().count();

    expect(await stationsPage.getStationBikeLimit(stationsCount - 1)).toEqual(stationLimit);
  });

  it('should fail if trying to add more bikes to station than limit', async () => {
    const stationLimit = 1;
    await createStationWithLimit('aaa', stationLimit);
    const stationsCount = await stationsPage.getStations().count();
    await stationsPage.getStations().get(stationsCount - 1).click();
    await addBike();
    await addBike();

    expect(await homePage.getErrorNotification().isPresent()).toBe(true);
    expect(await stationsPage.getBikes().count()).toEqual(stationLimit);
  });

  afterEach(async () => {
    const stationsCount = await stationsPage.getStations().count();
    for (let i = startingStationsCount; i < stationsCount; ++i) {
      if (await stationsPage.getStationStateText(i) !== stationsPage.stationBlockedText) {
        await blockStation(i);
      }

      const stationBikesCount = await stationsPage.getBikes().count();
      for (let j = 0; j < stationBikesCount; ++j) {
        if (await stationsPage.getBikeStateText() !== stationsPage.bikeBlockedText) {
          await blockBike();
        }

        await deleteBike();
      }

      await deleteStation(i);
    }
  });

  function createStation(name: string): promise.Promise<any> {
    return stationsPage.getNewStationNameInput().sendKeys(name)
      .then(() => stationsPage.getAddStationButton().click());
  }

  function createStationWithLimit(name: string, limit: number): promise.Promise<any> {
    return stationsPage.getNewStationNameInput().sendKeys(name)
      .then(() => stationsPage.getNewStationLimitInput().sendKeys(limit))
      .then(() => stationsPage.getAddStationButton().click());
  }

  function blockStation(index: number): promise.Promise<any> {
    const station = stationsPage.getStations().get(index);
    return station.click().then(() => stationsPage.getStationBlockButton(station).click());
  }

  function unblockStation(index: number): promise.Promise<any> {
    const station = stationsPage.getStations().get(index);
    return station.click().then(() => stationsPage.getStationUnblockButton(station).click());
  }

  function deleteStation(index: number): promise.Promise<any> {
    const station = stationsPage.getStations().get(index);
    return station.click().then(() => stationsPage.getStationDeleteButton(station).click());
  }

  function blockBike(): promise.Promise<any> {
    const bike = stationsPage.getBikes().get(0);
    return bike.click().then(() => stationsPage.getBikeBlockButton(bike).click());
  }

  function unblockBike(): promise.Promise<any> {
    const bike = stationsPage.getBikes().get(0);
    return bike.click().then(() => stationsPage.getBikeUnblockButton(bike).click());
  }

  function deleteBike(): promise.Promise<any> {
    const bike = stationsPage.getBikes().get(0);
    return bike.click().then(() => stationsPage.getBikeDeleteButton(bike).click());
  }

  function addBike(): promise.Promise<any> {
    return stationsPage.getAddBikeButton().click();
  }
});
