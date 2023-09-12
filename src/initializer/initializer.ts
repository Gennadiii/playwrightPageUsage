import {Browser, browserParamsInterface} from "../utils/browser.util";
import {actionsInterface, initializeActions} from "./actions";

export function init(params: browserParamsInterface): initializedInterface {
  const {page} = params;
  return {
    browser: new Browser(params),
    act: initializeActions(page),
  }
}

interface initializedInterface {
  browser: Browser;
  act: actionsInterface;
}
