import {TechsPage} from '../pages/techs.po';
import {browser, promise} from 'protractor';
import {LoginPage} from '../pages/login.po';
import {HomePage} from '../pages/home.po';

describe('users page', () => {
  let techsPage: TechsPage;
  let homePage: HomePage;

  beforeEach(async () => {
    techsPage = new TechsPage();
    homePage = new HomePage();
    await techsPage.navigateToTechs();

    if (await browser.getCurrentUrl() === `${browser.baseUrl}login`) {
      await (new LoginPage()).preformLogin();
      await techsPage.navigateToTechs();
    }
  });

  it('should add tech', async () => {
    const techsCount = await techsPage.getTechs().count();
    await addTech('aa', 'bb');

    expect(await techsPage.getTechs().count()).toEqual(techsCount + 1);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  it('should delete tech', async () => {
    const techsCount = await techsPage.getTechs().count();
    await addTech('aa', 'bb');
    await deleteTech(techsCount);

    expect(await techsPage.getTechs().count()).toEqual(techsCount);
    expect(await homePage.getSuccessNotification().isPresent()).toBe(true);
    expect(await homePage.getErrorNotification().isPresent()).toBe(false);
  });

  afterEach(async () => {
    const techsCount = await techsPage.getTechs().count();
    for (let i = 0; i < techsCount; ++i) {
      await deleteTech(0);
    }
  });

  it('should show login error if login exists', async () => {
    expect(await techsPage.getLoginError().isPresent()).toBe(false);
    await addTech('aa', 'bb');
    await addTech('aa', 'bb');

    expect(await techsPage.getLoginError().isPresent()).toBe(true);
  });

  function addTech(name: string, password: string): promise.Promise<any> {
    return techsPage.getShowAddTechButton().click()
      .then(() => techsPage.getTechLoginInput().sendKeys(name))
      .then(() => techsPage.getTechPasswordInput().sendKeys(password))
      .then(() => techsPage.getTechRepeatPasswordInput().sendKeys(password))
      .then(() => techsPage.getAddTechButton().click());
  }

  function deleteTech(index: number): promise.Promise<any> {
    const tech = techsPage.getTechs().get(index);
    return tech.click().then(() => techsPage.getTechDeleteButton(tech).click());
  }
});
