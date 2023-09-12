import {ElementFinder} from "../../../../elementFinder/elementFinder";
import {Button} from "../../components/button";

interface LandingPfInterface {
  getStartedButton: Button;
}

export class LandingPf implements LandingPfInterface {
  constructor(protected ef: ElementFinder) {
  }

  getStartedButton = new Button(this.ef.className("getStarted", {partial: true}));
}
