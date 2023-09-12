import {Browser} from "./browser.util";

export const current: currentInterface = {
  browsers: [],
  get browser(): Browser {
    return this.browsers[0];
  },
}

interface currentInterface {
  browsers: Browser[];
  browser: Browser;
}
