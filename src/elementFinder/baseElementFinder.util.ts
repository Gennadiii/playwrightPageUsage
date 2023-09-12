import {Page} from "@playwright/test";
import {
  baseElementFinderParamsInterface, partialInterface, SearchParams
} from "./elementFinder.types";

export interface BaseElementFinderInterface<T> {
  className: (className: string, params?: SearchParams<T>) => T;
  areaLabel: (labelName: string, params?: SearchParams<T>) => T;
}

export abstract class BaseElementFinder<T> implements BaseElementFinderInterface<T> {
  protected page: Page = null;

  protected constructor(params: baseElementFinderParamsInterface) {
    const {page} = params;
    this.page = page;
  }

  className(className: string, params: SearchParams<T> = {}): T {
    return this.attribute({...params, name: 'class', value: className});
  }

  areaLabel(labelName: string, params: SearchParams<T> = {}): T {
    return this.attribute({...params, name: 'aria-label', value: labelName});
  }

  private attribute(params: attributeInterface): T {
    const {partial, value, name} = params;
    return this.searchFunction(`[${name}${partial ? "*" : ""}='${value}']`, params);
  }

  protected abstract searchFunction(
    locator: string,
    params?: SearchParams<T>,
  ): T;
}

interface attributeInterface extends partialInterface {
  name: string;
  value: string;
}
