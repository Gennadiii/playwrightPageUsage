import {Browser, test} from '@playwright/test';

type SuiteFixtures = {
  pw: {
    browser: Browser;
  };
};

export const testFixture = test.extend<SuiteFixtures>({
  pw: async ({browser}, use) => {
    await use({browser});
  },
});
