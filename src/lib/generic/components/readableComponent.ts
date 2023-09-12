import {elementSearcher} from "../../../elementFinder/elementFinder.types";
import {BaseComponent} from "./baseComponent";

interface ReadableComponentInterface extends BaseComponent {
  getText: () => Promise<string>;
}

export abstract class ReadableComponent extends BaseComponent implements ReadableComponentInterface {
  protected constructor(public override es: elementSearcher) {
    super();
  }

  async getText(): Promise<string> {
    return (await this.es.findElement()).textContent();
  }
}
