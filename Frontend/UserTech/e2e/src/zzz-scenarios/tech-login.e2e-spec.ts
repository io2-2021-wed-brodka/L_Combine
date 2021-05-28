import {LoginPage} from '../pages/login.po';
import {browser} from 'protractor';

describe('login screen', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateToLogin();
  });

  it('loginButton should not navigate and show error when login unsuccessful', async () => {
    await loginPage.preformTechLogin();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
  });
});
