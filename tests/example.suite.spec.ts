import {expect} from "@playwright/test";
import {suite} from "../src/utils/suite.util";

suite({
  name: 'navigation (suite)',
  tests: [
    {
      name: '1 has title',
      async test({act, browser}) {
        await browser.openUrl('https://playwright.dev/');
        await browser.setLocalStorage({key: 'myKey', value: 'myValue'});
        await act.playwright.landing.verifyOpen();
        expect(await browser.getTitle()).toContain('Playwright');
      }
    },
    {
      name: '2 get started link',
      async test({act}) {
        await act.playwright.landing.getStarted();
        expect(await act.playwright.docs.sidebarPf.sidebar.waitUntilDisplayed(2000)).toBe(true);
      }
    },
    {
      name: '3 new context',
      isNewContext: true,
      async test({browser}) {
        expect(await browser.getTitle()).not.toContain('Playwright');
      }
    }
  ]
});
