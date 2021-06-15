import {$, $$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class TechsPage {
  navigateToTechs(): promise.Promise<any> {
    return browser.get('/rental/techs');
  }

  getTechs(): ElementArrayFinder {
    return $$('.list-item');
  }

  getTechDeleteButton(tech: ElementFinder): ElementFinder {
    return tech.$('button');
  }

  getShowAddTechButton(): ElementFinder {
    return $('.show-hide-add-tech');
  }

  getTechLoginInput(): ElementFinder {
    return $('app-add-tech #loginInput');
  }

  getTechPasswordInput(): ElementFinder {
    return $('app-add-tech #passwordInput');
  }

  getTechRepeatPasswordInput(): ElementFinder {
    return $('app-add-tech #repeatPasswordInput');
  }

  getAddTechButton(): ElementFinder {
    return $('app-add-tech .add-tech');
  }

  getLoginError(): ElementFinder {
    return $('.form').$$('div').get(0).$('.form-error');
  }
}
