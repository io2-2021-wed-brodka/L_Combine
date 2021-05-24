import {$, $$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class TechsPage {
  navigateToTechs(): promise.Promise<any> {
    return browser.get('/rental/techs');
  }

  getTechs(): ElementArrayFinder {
    return $$('.list-item');
  }

  getTechDeleteButton(tech: ElementFinder): ElementFinder {
    return tech.$('.show-hide-add-tech');
  }

  getShowAddTechButton(): ElementFinder {
    return $('.list button');
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
}
