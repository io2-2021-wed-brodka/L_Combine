import {LoginPage} from '../pages/login.po';
import {browser} from 'protractor';
import {HomePage} from '../pages/home.po';

describe('login screen', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateToLogin();
  });

  it('loginButton should be disabled if any of inputs empty', async () => {
    expect(await loginPage.getLoginButton().isEnabled()).toBe(false);
  });

  it('loginButton should be enabled if both inputs not empty', async () => {
    await loginPage.getLoginInput().sendKeys(loginPage.login);
    await loginPage.getPasswordInput().sendKeys(loginPage.password);

    expect(await loginPage.getLoginButton().isEnabled()).toBe(true);
  });

  it('loginButton should navigate to main page when login successful', async () => {
    await loginPage.getLoginInput().sendKeys(loginPage.login);
    await loginPage.getPasswordInput().sendKeys(loginPage.password);
    await loginPage.getLoginButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}rental/home`);
  });

  it('loginButton should not navigate and show error when login unsuccessful', async () => {
    expect(await loginPage.getLoginError().isPresent()).toBe(false);

    await loginPage.getLoginInput().sendKeys(loginPage.login);
    await loginPage.getPasswordInput().sendKeys(loginPage.password + '1');
    await loginPage.getLoginButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}login`);
    expect(await loginPage.getLoginError().isPresent()).toBe(true);
  });

  afterEach(async () => {
    if (await browser.getCurrentUrl() === `${browser.baseUrl}rental/home`) {
      (new HomePage()).getLogoutButton().click();
    }
  });
});
