import {ElementFinder} from "../../../../elementFinder/elementFinder";
import {Button} from "../../components/button";
import {Component} from "../../components/component";
import {ComponentsList} from "../../components/componentsList";
import {Label} from "../../components/label";

interface SearchResultsPfInterface {
  rightButton: Button;
  connectOrMessageButton: Button;
  cards: ComponentsList<Component>;
  getCardContentByCard: (card: Component) => cardInterface;
}

export class SearchResultsPf implements SearchResultsPfInterface {
  constructor(protected ef: ElementFinder) {
  }

  rightButton = new Button(this.ef.className("artdeco-pagination__button--next", {partial: true}));
  connectOrMessageButton = new Button(this.ef.className('search-primary-action__state-action-btn--omit-icon', {
    takeFirstElement: true,
    partial: true,
  }));
  cards = new ComponentsList(Component, this.ef.all.className('entity-result__item'));

  getCardContentByCard(card: Component): cardInterface {
    const root = card.es;
    return {
      connectButton: new Button(root.nested().areaLabel('Invite', {partial: true})),
      jobTitle: new Label(root.nested().className('entity-result__primary-subtitle', {
        partial: true,
        takeFirstElement: true
      })),
    }
  }
}

interface cardInterface {
  jobTitle: Label;
  connectButton: Button;
}

