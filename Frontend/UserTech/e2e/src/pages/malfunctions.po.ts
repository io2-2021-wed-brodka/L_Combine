import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class MalfunctionsPage {
  navigateToMalfunctions(): promise.Promise<any> {
    return browser.get('/rental/malfunctions');
  }

  getMalfunctions(): ElementArrayFinder {
    return $('app-list-malfunctions').$$('.list-item');
  }

  getMalfunctionCancelButton(malfunction: ElementFinder): ElementFinder {
    return malfunction.$$('button').first();
  }

  getMalfunctionAcceptButton(malfunction: ElementFinder): ElementFinder {
    return malfunction.$$('button').last();
  }

  getMalfunctionRepairButton(malfunction: ElementFinder): ElementFinder {
    return malfunction.$('button');
  }

  getMalfunctionButtons(malfunction: ElementFinder): ElementArrayFinder {
    return malfunction.$$('button');
  }
}
