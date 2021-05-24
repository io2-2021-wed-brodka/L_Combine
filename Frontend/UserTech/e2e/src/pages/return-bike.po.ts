import {$, $$, ElementArrayFinder, ElementFinder} from 'protractor';

export class ReturnBikePage {
  getBikeStations(): ElementArrayFinder {
    return $$('.list-item');
  }

  getReturnButton(): ElementFinder {
    return $('.button-back');
  }
}
