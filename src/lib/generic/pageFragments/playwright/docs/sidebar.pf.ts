import {ElementFinder} from "../../../../../elementFinder/elementFinder";
import {Component} from "../../../components/component";

interface SidebarPfInterface {
  sidebar: Component;
}

export class SidebarPf implements SidebarPfInterface {
  constructor(protected ef: ElementFinder) {
  }

  sidebar = new Component(this.ef.className("docSidebarContainer", {partial: true}));
}
