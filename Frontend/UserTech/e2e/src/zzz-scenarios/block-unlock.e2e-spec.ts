import {TechPage} from '../pages/tech.po';
import {HomePage} from '../pages/home.po';
import {LoginPage} from '../pages/login.po';
import {browser, promise} from 'protractor';

describe('block unblock bikes', () => {
  let techPage: TechPage;
  let homePage: HomePage;
  let activeBikesCount: number;
  let blockedBikesCount: number;

  beforeEach(async () => {
    techPage = new TechPage();
    homePage = new HomePage();
    await techPage.navigateToTech();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformTechLogin();
      await techPage.navigateToTech();
    }

    activeBikesCount = await techPage.getActiveBikes().count();
    blockedBikesCount = await techPage.getBlockedBikes().count();
  });

  it('should list bikes', async () => {
    expect(activeBikesCount).toBeGreaterThan(0);
  });

  it('should block bike', async () => {
    await blockBike(0);

    const bike = techPage.getBlockedBikes().get(0);
    expect(await techPage.getActiveBikes().count()).toEqual(activeBikesCount - 1);
    expect(await techPage.getBlockedBikes().count()).toEqual(blockedBikesCount + 1);
    expect(await techPage.getBikeState(bike)).toEqual(techPage.bikeBlockedText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should unblock bike', async () => {
    await blockBike(0);
    await unblockBike(0);

    const bike = techPage.getActiveBikes().get(0);
    expect(await techPage.getActiveBikes().count()).toEqual(activeBikesCount);
    expect(await techPage.getBlockedBikes().count()).toEqual(blockedBikesCount);
    expect(await techPage.getBikeState(bike)).toEqual(techPage.bikeActiveText);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  afterEach(async () => {
    const blocked = await techPage.getBlockedBikes().count();
    for (let i = blockedBikesCount; i < blocked; ++i){
      unblockBike(0);
    }
  });

  function blockBike(index: number): promise.Promise<any> {
    const bike = techPage.getActiveBikes().get(index);
    return bike.click().then(() => techPage.getActiveBikeBlockButton(bike).click());
  }

  function unblockBike(index: number): promise.Promise<any> {
    const bike = techPage.getBlockedBikes().get(index);
    return bike.click().then(() => techPage.getBlockedBikeUnblockButton(bike).click());
  }
});
