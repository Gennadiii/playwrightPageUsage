import {Locator, Page} from "@playwright/test";
import {ElementFinderInterface} from "./elementFinder";

export interface elementSearchInterface extends partialInterface {
  takeFirstElement?: boolean;
}

export type SearchParams<T> = T extends elementSearcher ? elementSearchInterface : elementsSearchInterface;

export interface elementFinderParamsInterface extends baseElementFinderParamsInterface {
  searchRoot?: FindElement;
}

export interface elementSearcher {
  findElement: FindElement;
  nested: () => ElementFinderInterface;
  locator: string;
}

export type FindElement = () => Promise<Locator>;

export interface elementsFinderParamsInterface extends baseElementFinderParamsInterface {
  searchRoot?: FindElement;
}

export interface elementsSearcher {
  findElements: () => Promise<Locator[]>;
  getElementByIndex: (
    index: number,
  ) => elementSearcher;
}

export interface baseElementFinderParamsInterface {
  page: Page;
}

export interface elementsSearchInterface extends partialInterface {
}

export interface partialInterface {
  partial?: boolean;
}
