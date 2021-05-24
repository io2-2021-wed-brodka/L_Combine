import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class StationsPage {
  get stationActiveText(): string {
    return 'Aktywna';
  }

  get stationBlockedText(): string {
    return 'Zablokowana';
  }

  get bikeActiveText(): string {
    return 'Dostępny';
  }

  get bikeBlockedText(): string {
    return 'Zablokowany';
  }

  navigateToStations(): promise.Promise<any> {
    return browser.get('/rental/stations');
  }

  getStations(): ElementArrayFinder {
    return $('app-list-stations').$$('.list-item');
  }

  getStationBlockButton(station: ElementFinder): ElementFinder {
    return station.$('.button-block');
  }

  getStationUnblockButton(station: ElementFinder): ElementFinder {
    return station.$('.button-unblock');
  }

  getStationDeleteButton(station: ElementFinder): ElementFinder {
    return station.$('.button-delete');
  }

  getStationStateText(stationIdx: number): promise.Promise<string> {
    return this.getStations().get(stationIdx).$('.station-state span').getText();
  }

  getStationBikeLimit(stationIdx: number): promise.Promise<number> {
    return this.getStations().get(stationIdx).$('.station-limit').getText().then(value => +(value.split(' ')[1]));
  }

  getAddBikeButton(): ElementFinder {
    return $('.add-bike-button');
  }

  getBikes(): ElementArrayFinder {
    return $('app-list-station-bikes').$$('.list-item');
  }

  getBikeBlockButton(bike: ElementFinder): ElementFinder {
    return bike.$('.button-block');
  }

  getBikeUnblockButton(bike: ElementFinder): ElementFinder {
    return bike.$('.button-unblock');
  }

  getBikeDeleteButton(bike: ElementFinder): ElementFinder {
    return bike.$('.button-delete');
  }

  getBikeStateText(): promise.Promise<string> {
    return  this.getBikes().get(0).$('.list-item-side-right').getText();
  }

  getNewStationNameInput(): ElementFinder {
    return $('#station-name-input');
  }

  getNewStationLimitInput(): ElementFinder {
    return $('#station-limit-input');
  }

  getAddStationButton(): ElementFinder {
    return $('.add-station-button');
  }
}
