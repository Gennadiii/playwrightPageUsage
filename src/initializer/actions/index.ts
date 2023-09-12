import {Page} from "@playwright/test";
import {ElementFinder} from "../../elementFinder/elementFinder";
import {SearchResultsAction} from "../../lib/generic/actions/linkedin/searchResults.action";
import {DocsAction} from "../../lib/generic/actions/playwright/docs.action";
import {LandingAction} from "../../lib/generic/actions/playwright/landing.action";
import {searchResults} from "./linkedin/searchResults";
import {docs} from "./playwright/docs";
import {landing} from "./playwright/landing";

export function initializeActions(page: Page): actionsInterface {
  const ef = new ElementFinder({page: page});
  return {
    playwright: {
      docs: docs(ef),
      landing: landing(ef),
    },
    linkedin: {
      searchResults: searchResults(ef),
    }
  };
}

export interface actionsInterface {
  playwright: {
    docs: DocsAction;
    landing: LandingAction;
  };
  linkedin: {
    searchResults: SearchResultsAction;
  };
}
