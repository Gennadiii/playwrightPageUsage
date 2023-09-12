import {ElementFinder} from "../../../elementFinder/elementFinder";
import {DocsAction} from "../../../lib/generic/actions/playwright/docs.action";
import {SidebarPf} from "../../../lib/generic/pageFragments/playwright/docs/sidebar.pf";

export function docs(ef: ElementFinder) {
  return new DocsAction({sidebarPf: new SidebarPf(ef)})
}

export interface docsActionParamsInterface {
  sidebarPf: SidebarPf;
}
