import {$, browser, by, element, ElementArrayFinder, ElementFinder, promise} from 'protractor';

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

  getBikeStationAvailableBikesCount(station: ElementFinder): promise.Promise<number> {
    return station.$('.bikes-count').getText().then(value => +(value.split(' ')[1]));
  }

  getRentedBikeReturnButton(rentedBike: ElementFinder): ElementFinder {
    return rentedBike.$('.button-return');
  }

  getRentedBikeMalfunctionButton(rentedBike: ElementFinder): ElementFinder {
    return rentedBike.$('.button-malfunction');
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
    return $('button.logout');
  }

  getUserPanelNav(): ElementFinder {
    return element(by.cssContainingText('.navigation-link', 'Panel użytkownika'));
  }

  getTechPanelNav(): ElementFinder {
    return element(by.cssContainingText('.navigation-link', 'Panel specjalisty'));
  }
}
