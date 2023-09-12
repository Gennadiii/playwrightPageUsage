import {elementSearcher} from "../../../elementFinder/elementFinder.types";
import {BaseComponent} from "./baseComponent";

interface ComponentInterface extends BaseComponent {

}

export class Component extends BaseComponent implements ComponentInterface {
  constructor(public override es: elementSearcher) {
    super();
  }
}
