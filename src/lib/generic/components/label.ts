import {elementSearcher} from "../../../elementFinder/elementFinder.types";
import {ReadableComponent} from "./readableComponent";

interface LabelInterface extends ReadableComponent {
}

export class Label extends ReadableComponent implements LabelInterface {
  constructor(public override es: elementSearcher) {
    super(es);
  }
}
