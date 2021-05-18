import {$$, browser, ElementArrayFinder, promise} from 'protractor';

export class BikesPage {
  navigateToBikes(): promise.Promise<any> {
    return browser.get('rental/bikes');
  }

  getBikes(): ElementArrayFinder {
    return $$('.list-item');
  }
}
