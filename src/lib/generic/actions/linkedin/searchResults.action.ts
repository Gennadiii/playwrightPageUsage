import {searchResultsActionParamsInterface} from "../../../../initializer/actions/linkedin/searchResults";
import {current} from "../../../../utils/current.util";
import {ConfirmRequestModalPf} from "../../pageFragments/linkedin/confirmRequestModal.pf";
import {SearchResultsPf} from "../../pageFragments/linkedin/searchResults.pf";

interface SearchResultsActionInterface {
  connectEveryoneWithin: (params: connectEveryoneWithinInterface) => Promise<void>;
}

export class SearchResultsAction implements SearchResultsActionInterface {

  public searchResultsPf: SearchResultsPf = null;
  private confirmModalPf: ConfirmRequestModalPf = null;

  constructor(params: searchResultsActionParamsInterface) {
    const {searchResultsPf, confirmModalPf} = params;
    this.searchResultsPf = searchResultsPf;
    this.confirmModalPf = confirmModalPf;
  }

  async connectEveryoneWithin(params: connectEveryoneWithinInterface): Promise<void> {
    let addedCounter = 0;
    const {pagesCount} = params;
    for (const _ of Array(pagesCount).fill(null)) {
      await this.waitForPageToLoad();
      for (const card of await this.searchResultsPf.cards.getAllComponents()) {
        const {connectButton, jobTitle} = this.searchResultsPf.getCardContentByCard(card);
        if (await connectButton.isDisplayed()) {
          try {
            await connectButton.click();
            await this.confirmModalPf.sendNowButton.click();
            console.info(`Added ${++addedCounter}: ${await jobTitle.getText()}`);
          } catch {
            console.warn(`failed to invite: ${await jobTitle.getText()}`);
          }
        }
        console.info(`${await jobTitle.getText()} is already connected`);
      }
      await current.browser.scrollBy({x: 0, y: 1000});
      await this.searchResultsPf.rightButton.click();
    }
    console.info(`TOTALLY ADDED "${addedCounter}" RECRUITERS`);
  }

  async waitForPageToLoad(): Promise<void> {
    await this.searchResultsPf.connectOrMessageButton.waitUntilDisplayed(5000, {errorMessage: `failed to wait for any buttons`});
  }
}

interface connectEveryoneWithinInterface {
  pagesCount: number;
}
