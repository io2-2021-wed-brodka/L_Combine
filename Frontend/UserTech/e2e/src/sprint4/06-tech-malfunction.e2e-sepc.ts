import {HomePage} from '../pages/home.po';
import {LoginPage} from '../pages/login.po';
import {browser} from 'protractor';
import {MalfunctionsPage} from '../pages/malfunctions.po';

describe('tech malfunctions', () => {
  let malfunctionsPage: MalfunctionsPage;
  let homePage: HomePage;
  let loginPage: LoginPage;

  beforeEach(async () => {
    malfunctionsPage = new MalfunctionsPage();
    homePage = new HomePage();
    loginPage = new LoginPage();
    await malfunctionsPage.navigateToMalfunctions();

    if (await browser.getCurrentUrl() !== `${browser.baseUrl}rental/malfunctions`) {
      await loginPage.navigateToLogin();
      await loginPage.preformTechLogin();
      await malfunctionsPage.navigateToMalfunctions();
    }
  });

  it('should list malfunctions', async () => {
    const malfunctionsCount = await malfunctionsPage.getMalfunctions().count();

    expect(malfunctionsCount).toBeGreaterThan(0);
  });
});
