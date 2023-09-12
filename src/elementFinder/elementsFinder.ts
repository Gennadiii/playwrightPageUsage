import {Locator} from "@playwright/test";
import {BaseElementFinder} from "./baseElementFinder.util";
import {ElementFinder} from "./elementFinder";
import {
  elementsFinderParamsInterface,
  elementsSearcher,
  FindElement,
} from "./elementFinder.types";

export interface ElementsFinderInterface extends BaseElementFinder<elementsSearcher> {
}

export class ElementsFinder extends BaseElementFinder<elementsSearcher> implements ElementsFinderInterface {
  private readonly searchRoot: FindElement = null;

  constructor(params: elementsFinderParamsInterface) {
    super(params);
    const {searchRoot} = params;
    this.searchRoot = searchRoot;
  }

  protected override searchFunction(locator: string): elementsSearcher {
    const findElements = async (): Promise<Locator[]> => {
      const root = this.searchRoot ? await this.searchRoot() : this.page;
      return root.locator(locator).all();
    }

    const getElementByIndex = (index: number) => {
      async function findElement() {
        return (await findElements())[index];
      }

      const nested = (): ElementFinder => {
        return new ElementFinder({
          searchRoot: () => findElement(),
          page: this.page,
        });
      };
      return {
        findElement,
        nested,
        locator: `${locator}[${index}]`,
      };
    }
    return {
      findElements,
      getElementByIndex,
    };
  }
}
