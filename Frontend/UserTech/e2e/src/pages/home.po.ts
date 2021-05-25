import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class HomePage {
  navigateToHome(): promise.Promise<any> {
    return browser.get('/rental/home');
  }

  getRentedBikes(): ElementArrayFinder {
    return $('.bikes-rented').$$('.list-item');
  }

  getReservedBikes(): ElementArrayFinder {
    return $('.bikes-reserved').$$('.list-item');
  }

  getBikeStations(): ElementArrayFinder {
    return $('.rent-bike').$$('.list-item');
  }

  getRentedBikeReturnButton(rentedBike: ElementFinder): ElementFinder {
    return rentedBike.$('.button-return');
  }

  getReservedBikeRentButton(reservedBike: ElementFinder): ElementFinder {
    return reservedBike.$('.button-rent');
  }

  getReservedBikeCancelButton(reservedBike: ElementFinder): ElementFinder {
    return reservedBike.$('.button-cancel');
  }

  getSuccessNotification(): ElementFinder {
    return $('.message-success');
  }

  getErrorNotification(): ElementFinder {
    return $('.message-error');
  }

  getLogoutButton(): ElementFinder {
    return $('.logout');
  }
}
