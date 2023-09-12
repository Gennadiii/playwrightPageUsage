import _ from "lodash";
import {elementsSearcher} from "../../../elementFinder/elementFinder.types";
import {BaseComponent} from "./baseComponent";

interface ComponentsListInterface<T> {
  getComponentByIndex: (index: number) => T;
  getLength: () => Promise<number>;
  getAllComponents: () => Promise<T[]>;
}

export class ComponentsList<T extends BaseComponent>
  implements ComponentsListInterface<T> {

  constructor(
    protected DesiredComponent: Constructable<T>,
    public es: elementsSearcher,
  ) {
  }

  getComponentByIndex(index: number): T {
    return new this.DesiredComponent(this.es.getElementByIndex(index));
  }

  async getLength(): Promise<number> {
    return (await this.es.findElements()).length;
  }

  async getAllComponents(): Promise<T[]> {
    return _.times(await this.getLength()).map(index =>
      this.getComponentByIndex(index),
    );
  }
}

// eslint-disable-next-line
type Constructable<T> = new (...args: any[]) => T;
