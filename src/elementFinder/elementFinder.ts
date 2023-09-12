import {
  BaseElementFinder,
  BaseElementFinderInterface,
} from "./baseElementFinder.util";
import {
  elementFinderParamsInterface,
  elementSearcher,
  elementSearchInterface,
  FindElement,
} from "./elementFinder.types";
import {ElementsFinder} from "./elementsFinder";

export interface ElementFinderInterface extends BaseElementFinderInterface<elementSearcher> {
  all: ElementsFinder;
}

export class ElementFinder extends BaseElementFinder<elementSearcher> implements ElementFinderInterface {
  private readonly searchRoot: FindElement = null;

  constructor(params: elementFinderParamsInterface) {
    super(params);
    const {searchRoot} = params;
    this.searchRoot = searchRoot;
  }

  get all(): ElementsFinder {
    return new ElementsFinder({page: this.page, searchRoot: this.searchRoot});
  }

  protected override searchFunction(locator: string, params: elementSearchInterface = {}): elementSearcher {
    const {takeFirstElement} = params;
    const findElement = async () => {
      const root = this.searchRoot ? await this.searchRoot() : this.page;
      const element = root.locator(locator);
      return takeFirstElement ? element.first() : element;
    }
    const nested = (): ElementFinderInterface => {
      return new ElementFinder({page: this.page, searchRoot: () => findElement()});
    }
    return {
      findElement,
      nested,
      locator,
    };
  }
}
