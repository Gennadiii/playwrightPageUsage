import {elementSearcher} from "../../../elementFinder/elementFinder.types";
import {BaseComponent} from "./baseComponent";

interface ButtonInterface {
  click: () => Promise<void>;
}

export class Button extends BaseComponent implements ButtonInterface {
  constructor(public override es: elementSearcher) {
    super();
  }

  async click(): Promise<void> {
    await (await this.es.findElement()).click();
  }
}
