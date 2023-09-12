import process from "process";
import {test} from "../src/fixtures/fixture";
import {current} from "../src/utils/current.util";

test.describe('linkedin', () => {

  test('link', async ({act}) => {
    await current.browser.addCookies([{
      name: 'li_at',
      value: process.env.linkedinAuthCookie,
      domain: '.linkedin.com',
      path: '/'
    }])
    await current.browser.openUrl('https://www.linkedin.com/search/results/people/?keywords=recruiter&network=%5B%22S%22%5D&origin=FACETED_SEARCH&sid=rN4/');
    await act.linkedin.searchResults.waitForPageToLoad();
    await act.linkedin.searchResults.connectEveryoneWithin({pagesCount: 8});
  });
});
