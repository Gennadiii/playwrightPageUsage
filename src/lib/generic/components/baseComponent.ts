import * as console from "console";
import {elementSearcher} from "../../../elementFinder/elementFinder.types";

interface BaseComponentInterface {
  isDisplayed: () => Promise<boolean>;
  waitUntilDisplayed: (timeout: number, params?: waitUntilDisplayedInterface) => Promise<boolean>;
}

export abstract class BaseComponent implements BaseComponentInterface {

  es: elementSearcher = null;

  async isDisplayed(): Promise<boolean> {
    return (await this.es.findElement()).isVisible();
  }

  async waitUntilDisplayed(timeout: number, params: waitUntilDisplayedInterface = {}): Promise<boolean> {
    const {throwError = true, errorMessage = 'failed to wait for element'} = params;
    try {
      await (await this.es.findElement()).waitFor({timeout, state: "visible"});
      return true;
    } catch (err) {
      console.error(`${errorMessage}: ${this.es.locator}`);
      if (throwError) {
        throw {...err, message: `${errorMessage}: ${err.message}}`};
      }
      return false;
    }
  }
}

interface waitUntilDisplayedInterface {
  errorMessage?: string;
  throwError?: boolean;
}
