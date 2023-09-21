import {Browser as PwBrowser} from "@playwright/test";
import {testFixture} from "../fixtures/suiteFixture";
import {actionsInterface} from "../initializer/actions";
import {init} from "../initializer/initializer";
import {Browser} from "./browser.util";
import {current} from "./current.util";

const executionParams: executionInterface = {act: null, browser: null};

export function suite(params: suiteInterface): void {
  const {afterAll, beforeAll, name, tests, beforeEach, afterEach} = params;

  if (name.length === 0) {
    throw new Error(`Please specify suite name`);
  }

  testFixture.beforeAll(async ({browser}) => {
    await initiatePageByPwBrowser(browser);
    beforeAll && await beforeAll(executionParams);
  });

  testFixture.afterAll(async () => {
    afterAll && await afterAll(executionParams);
  });

  testFixture.describe(name, () => {
    beforeEach && testFixture.beforeEach(async () => beforeEach(executionParams));
    afterEach && testFixture.afterEach(async () => afterEach(executionParams));

    tests.forEach(suiteTest => {
      const {test, name, isNewContext} = suiteTest;
      testFixture(name, async ({browser}) => test(isNewContext ? await initiatePageByPwBrowser(browser) : executionParams));
    })
  });
}

async function initiatePageByPwBrowser(pwBrowser: PwBrowser): Promise<executionInterface> {
  const context = await pwBrowser.newContext({viewport: {width: 1920, height: 1080}});
  const page = await context.newPage();
  const {browser, act} = init({page, context});
  // do not override variable because of need to pass by reference
  executionParams.act = act;
  executionParams.browser = browser;
  current.browsers.push(browser);
  return {act, browser};
}

interface suiteInterface {
  name: string;
  beforeAll?: (params: executionInterface) => Promise<void>;
  beforeEach?: (params: executionInterface) => Promise<void>;
  afterEach?: (params: executionInterface) => Promise<void>;
  afterAll?: (params: executionInterface) => Promise<void>;
  tests: testInterface[];
}

interface testInterface {
  name: string;
  xname?: string;
  fname?: string;
  test: (params: executionInterface) => Promise<void>;
  isNewContext?: boolean;
}

interface executionInterface {
  browser: Browser;
  act: actionsInterface;
}
