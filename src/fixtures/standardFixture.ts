import {test as base} from '@playwright/test';
import {actionsInterface} from "../initializer/actions";
import {init} from "../initializer/initializer";
import {Browser} from "../utils/browser.util";
import {current} from "../utils/current.util";

type MyFixtures = {
  act: actionsInterface;
  browser: Browser;
};

export const test = base.extend<MyFixtures>({
  act: async ({page, context}, use) => {
    const {act, browser} = init({page, context});
    current.browsers.push(browser);
    await use(act);
    current.browsers.shift();
  },
});

export {expect} from '@playwright/test';
