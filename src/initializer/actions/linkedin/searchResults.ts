import {ElementFinder} from "../../../elementFinder/elementFinder";
import {SearchResultsAction} from "../../../lib/generic/actions/linkedin/searchResults.action";
import {ConfirmRequestModalPf} from "../../../lib/generic/pageFragments/linkedin/confirmRequestModal.pf";
import {SearchResultsPf} from "../../../lib/generic/pageFragments/linkedin/searchResults.pf";

export function searchResults(ef: ElementFinder) {
  return new SearchResultsAction({
    searchResultsPf: new SearchResultsPf(ef),
    confirmModalPf: new ConfirmRequestModalPf(ef)
  })
}

export interface searchResultsActionParamsInterface {
  searchResultsPf: SearchResultsPf;
  confirmModalPf: ConfirmRequestModalPf;
}
