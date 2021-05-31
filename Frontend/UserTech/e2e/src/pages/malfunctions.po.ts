import {$$, browser, ElementArrayFinder, promise} from 'protractor';

export class MalfunctionsPage {
  navigateToMalfunctions(): promise.Promise<any> {
    return browser.get('/rental/malfunctions');
  }

  getMalfunctions(): ElementArrayFinder {
    return $$('.list-item');
  }
}
