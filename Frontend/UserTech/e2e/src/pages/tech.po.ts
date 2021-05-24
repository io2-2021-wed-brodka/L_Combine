import {$, browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';

export class TechPage {
  navigateToTech(): promise.Promise<any> {
    return browser.get('/rental/tech');
  }

  getActiveBikes(): ElementArrayFinder {
    return $('.active-bikes').$$('.list-item');
  }

  getBlockedBikes(): ElementArrayFinder {
    return $('.blocked-bikes').$$('.list-item');
  }

  getActiveBikeBlockButton(bike: ElementFinder): ElementFinder {
    return bike.$('button');
  }

  getBlockedBikeAUnblockButton(bike: ElementFinder): ElementFinder {
    return bike.$('button');
  }
}
