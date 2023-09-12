import {BrowserContext, Page} from "@playwright/test";

interface BrowserInterface {
  openUrl: (url: string) => Promise<void>;
  setLocalStorage: (params: setLocalStorageInterface) => Promise<void>;
  addCookies: (params: addCookieInterface[]) => Promise<void>;
  scrollBy: (params: scrollByInterface) => Promise<void>;
  getTitle: () => Promise<string>;
}

export class Browser implements BrowserInterface {
  private page: Page = null;
  private context: BrowserContext = null;

  constructor(params: browserParamsInterface) {
    const {page, context} = params;
    this.page = page;
    this.context = context;
  }

  async openUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async setLocalStorage(params: setLocalStorageInterface): Promise<void> {
    await this.page.addInitScript((_params) => {
      const {key, value} = _params;
      // @ts-ignore
      window.localStorage.setItem(key, value);
    }, params);
  }

  async addCookies(params: addCookieInterface[]): Promise<void> {
    await this.context.addCookies(params);
  }

  async scrollBy(params: scrollByInterface): Promise<void> {
    const {x, y} = params;
    await this.page.mouse.wheel(x, y);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}

export interface browserParamsInterface {
  page: Page;
  context: BrowserContext;
}

interface setLocalStorageInterface {
  key: string;
  value: string;
}

interface scrollByInterface {
  x: number;
  y: number;
}

interface addCookieInterface {
  name: string;
  value: string;
  domain: string;
  path: string;
}
