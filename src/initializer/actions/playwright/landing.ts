import {ElementFinder} from "../../../elementFinder/elementFinder";
import {LandingAction} from "../../../lib/generic/actions/playwright/landing.action";
import {LandingPf} from "../../../lib/generic/pageFragments/playwright/landing.pf";

export function landing(ef: ElementFinder) {
  return new LandingAction({landingPf: new LandingPf(ef)})
}

export interface landingActionParamsInterface {
  landingPf: LandingPf;
}
