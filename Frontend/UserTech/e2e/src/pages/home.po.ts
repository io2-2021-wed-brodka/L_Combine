import {browser, by, element, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class HomePage {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/rental/home');
  }

  getRentedBikes(): ElementArrayFinder {
    return element(by.css('.bikes-rented')).all(by.css('.list-item'));
  }

  getReservedBikes(): ElementArrayFinder {
    return element(by.css('.bikes-reserved')).all(by.css('.list-item'));
  }

  getBikeStations(): ElementArrayFinder {
    return element(by.css('.rent-bike')).all(by.css('.list-item'));
  }

  getRentedBikeReturnButton(rentedBike: ElementFinder): ElementFinder {
    return rentedBike.element(by.css('.button-return'));
  }

  getReservedBikeRentButton(reservedBike: ElementFinder): ElementFinder {
    return reservedBike.element(by.css('.button-rent'));
  }

  getReservedBikeCancelButton(reservedBike: ElementFinder): ElementFinder {
    return reservedBike.element(by.css('.button-cancel'));
  }

  getSuccessNotification(): ElementFinder {
    return element(by.css('.message-success'));
  }

  getErrorNotification(): ElementFinder {
    return element(by.css('.message-error'));
  }

  getLogoutButton(): ElementFinder {
    return element(by.css('.logout'));
  }
}
