import {$, ElementFinder} from 'protractor';

export class NewMalfunctionPage {
  getDescriptionTextbox(): ElementFinder {
    return $('textarea.description');
  }

  getReportButton(): ElementFinder {
    return $('button.button-submit');
  }
}
