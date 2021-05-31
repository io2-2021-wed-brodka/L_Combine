import {$, ElementArrayFinder, ElementFinder} from 'protractor';

export class StationBikesPage {
  getStationBikes(): ElementArrayFinder {
    return $('app-list-station-bikes').$$('.list-item-active');
  }

  getBikeRentButton(bike: ElementFinder): ElementFinder {
    return bike.$('.button-rent');
  }

  getBikeReserveButton(bike: ElementFinder): ElementFinder {
    return bike.$('.button-reserve');
  }

  getReturnButton(): ElementFinder {
    return $('.button-back');
  }
}
