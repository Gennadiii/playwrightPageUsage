import {test, expect} from "../src/fixtures/fixture";
import {current} from "../src/utils/current.util";

test.describe('navigation', () => {

  test.beforeEach(async ({act}) => {
    await current.browser.openUrl('https://playwright.dev/');
    await current.browser.setLocalStorage({key: 'myKey', value: 'myValue'});
  });

  test('1 has title', async ({act}) => {
    await act.playwright.landing.verifyOpen();
    expect(await current.browser.getTitle()).toContain('Playwright');
  });

  test('2 get started link', async ({act}) => {
    await act.playwright.landing.getStarted();
    expect(await act.playwright.docs.sidebarPf.sidebar.waitUntilDisplayed(2000)).toBe(true);
  });
});
