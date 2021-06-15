import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class TechPage {
  get bikeActiveText(): string {
    return 'available';
  }

  get bikeBlockedText(): string {
    return 'blocked';
  }

  navigateToTech(): promise.Promise<any> {
    return browser.get('/rental/tech');
  }

  getActiveBikes(): ElementArrayFinder {
    return $('.active-bikes').$$('.list-item');
  }

  getBlockedBikes(): ElementArrayFinder {
    return $('.blocked-bikes').$$('.list-item');
  }

  getBikeState(bike: ElementFinder): promise.Promise<string> {
    return bike.$('.list-item-side-right div').getText().then(text => text.split(' ')[1]);
  }

  getActiveBikeBlockButton(bike: ElementFinder): ElementFinder {
    return bike.$('button');
  }

  getBlockedBikeUnblockButton(bike: ElementFinder): ElementFinder {
    return bike.$('button');
  }
}
