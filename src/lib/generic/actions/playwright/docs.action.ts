import {docsActionParamsInterface} from "../../../../initializer/actions/playwright/docs";
import {SidebarPf} from "../../pageFragments/playwright/docs/sidebar.pf";

interface DocsActionInterface {
}

export class DocsAction {

  public sidebarPf: SidebarPf = null;

  constructor(params: docsActionParamsInterface) {
    const {sidebarPf} = params;
    this.sidebarPf = sidebarPf;
  }
}
