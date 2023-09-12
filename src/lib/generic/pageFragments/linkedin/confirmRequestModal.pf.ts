import {ElementFinder} from "../../../../elementFinder/elementFinder";
import {Button} from "../../components/button";

interface ConfirmRequestModalPfInterface {
  sendNowButton: Button;
}

export class ConfirmRequestModalPf implements ConfirmRequestModalPfInterface {
  constructor(protected ef: ElementFinder) {
  }

  sendNowButton = new Button(this.ef.areaLabel("Send now"));
}
