import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class StationBikesPage {
  getStationBikes(): ElementArrayFinder {
    return element.all(by.css('.list-item'));
  }

  getStationActiveBikes(): ElementArrayFinder {
    return element.all(by.css('.list-item-active'));
  }

  getStationInactiveBikes(): ElementArrayFinder {
    return element.all(by.css('.list-item:not(.list-item-active)'));
  }

  getBikeRentButton(bike: ElementFinder): ElementFinder {
    return bike.element(by.css('.button-rent'));
  }

  getBikeReserveButton(bike: ElementFinder): ElementFinder {
    return bike.element(by.css('.button-reserve'));
  }

  getReturnButton(): ElementFinder {
    return element(by.css('.button-back'));
  }
}
