import {LoginPage} from '../pages/login.po';
import {browser} from 'protractor';

describe('tech login screen', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateToLogin();
  });

  it('loginButton should login when data is correct', async () => {
    await loginPage.preformTechLogin();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
  });
});
