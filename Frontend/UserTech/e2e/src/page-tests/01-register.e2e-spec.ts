import {RegisterPage} from '../pages/register.po';
import {browser} from 'protractor';

describe('register screen', () => {
  let registerPage: RegisterPage;

  beforeEach(async () => {
    registerPage = new RegisterPage();
    await registerPage.navigateToRegister();
  });

  it('registerButton should be disabled if any of inputs invalid', async () => {
    expect(await registerPage.getRegisterButton().isEnabled()).toBe(false);
  });

  it('registerButton should be enabled if both inputs not empty', async () => {
    await registerPage.getLoginInput().sendKeys(registerPage.login);
    await registerPage.getPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRepeatPasswordInput().sendKeys(registerPage.password);

    expect(await registerPage.getRegisterButton().isEnabled()).toBe(true);
  });

  it('loginError should appear if loginInput empty', async () => {
    expect(await registerPage.getLoginError().isPresent()).toBe(false);

    await registerPage.getLoginInput().click();
    await registerPage.getPasswordInput().click();

    expect(await registerPage.getLoginError().isPresent()).toBe(true);
  });

  it('passwordError should appear if passwordInput empty', async () => {
    expect(await registerPage.getPasswordError().isPresent()).toBe(false);

    await registerPage.getPasswordInput().click();
    await registerPage.getLoginInput().click();

    expect(await registerPage.getPasswordError().isPresent()).toBe(true);
  });

  it('repeatPasswordError should appear if loginInput empty', async () => {
    expect(await registerPage.getRepeatPasswordError().isPresent()).toBe(false);

    await registerPage.getRepeatPasswordInput().click();
    await registerPage.getPasswordInput().click();

    expect(await registerPage.getRepeatPasswordError().isPresent()).toBe(true);
  });

  it('repeatPasswordError should appear if passwords dont match', async () => {
    expect(await registerPage.getRepeatPasswordError().isPresent()).toBe(false);

    await registerPage.getLoginInput().sendKeys(registerPage.login);
    await registerPage.getPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRepeatPasswordInput().sendKeys(registerPage.password + '1');
    await registerPage.getRegisterButton().click();

    expect(await registerPage.getRepeatPasswordError().isPresent()).toBe(true);
  });

  it('registerButton should navigate when register successful', async () => {
    await registerPage.getLoginInput().sendKeys(registerPage.login);
    await registerPage.getPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRepeatPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRegisterButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}login`);
  });

  it('registerButton should not navigate and show error if login taken', async () => {
    expect(await registerPage.getLoginError().isPresent()).toBe(false);

    await registerPage.getLoginInput().sendKeys(registerPage.login);
    await registerPage.getPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRepeatPasswordInput().sendKeys(registerPage.password);
    await registerPage.getRegisterButton().click();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}register`);
    expect(await registerPage.getLoginError().isPresent()).toBe(true);
  });
});
