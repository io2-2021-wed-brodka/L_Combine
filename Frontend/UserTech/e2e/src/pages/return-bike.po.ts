import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class ReturnBikePage {
  getBikeStations(): ElementArrayFinder {
    return element.all(by.css('.list-item'));
  }

  getReturnButton(): ElementFinder {
    return element(by.css('.button-back'));
  }
}
