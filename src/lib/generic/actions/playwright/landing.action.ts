import {landingActionParamsInterface} from "../../../../initializer/actions/playwright/landing";
import {LandingPf} from "../../pageFragments/playwright/landing.pf";

interface LandingActionInterface {
  getStarted: () => Promise<void>;
  verifyOpen: () => Promise<void>;
}

export class LandingAction implements LandingActionInterface {

  private landingPf: LandingPf = null;

  constructor(params: landingActionParamsInterface) {
    const {landingPf} = params;
    this.landingPf = landingPf;
  }

  async getStarted(): Promise<void> {
    await this.landingPf.getStartedButton.click();
  }

  async verifyOpen(): Promise<void> {
    await this.landingPf.getStartedButton.waitUntilDisplayed(2000, {errorMessage: 'landing did not load'});
  }
}
